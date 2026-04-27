import sqlite3
from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = "admin123"


# DATABASE CREATE
def init_db():

    conn = sqlite3.connect("events.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        event TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS events(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        image TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()


# HOME PAGE
@app.route("/")
def home():
    return render_template("index.html")


# EVENTS PAGE
@app.route("/events")
def events():

    conn = sqlite3.connect("events.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events")
    events = cursor.fetchall()

    conn.close()

    return render_template("events.html", events=events)


# REGISTER PAGE
@app.route("/register", methods=["GET","POST"])
def register():

    if request.method == "POST":

        name = request.form["name"]
        email = request.form["email"]
        event = request.form["event"]

        conn = sqlite3.connect("events.db")
        cursor = conn.cursor()

        cursor.execute(
        "INSERT INTO students(name,email,event) VALUES(?,?,?)",
        (name,email,event)
        )

        conn.commit()
        conn.close()

        return render_template("success.html", event=event)

    return render_template("register.html")


# ADMIN LOGIN
@app.route("/admin-login", methods=["GET","POST"])
def admin_login():

    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        if username == "admin" and password == "12345":
            session["admin"] = True
            return redirect("/admin")

        else:
            return "Invalid Username or Password"

    return render_template("admin-login.html")


# ADMIN DASHBOARD
@app.route("/admin", methods=["GET","POST"])
def admin():

    if "admin" not in session:
        return redirect("/admin-login")

    conn = sqlite3.connect("events.db")
    cursor = conn.cursor()

    # ADD EVENT
    if request.method == "POST":

        title = request.form["title"]
        description = request.form["description"]
        image = request.form["image"]

        cursor.execute(
        "INSERT INTO events(title,description,image) VALUES(?,?,?)",
        (title,description,image)
        )

        conn.commit()

    # FETCH EVENTS
    cursor.execute("SELECT * FROM events")
    events = cursor.fetchall()

    # FETCH STUDENTS
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()

    conn.close()

    return render_template("admin.html", events=events, students=students)


# DELETE EVENT
@app.route("/delete-event/<int:id>")
def delete_event(id):

    conn = sqlite3.connect("events.db")
    cursor = conn.cursor()

    cursor.execute("DELETE FROM events WHERE id=?", (id,))

    conn.commit()
    conn.close()

    return redirect("/admin")


# DELETE STUDENT
@app.route("/delete-student/<int:id>")
def delete_student(id):

    conn = sqlite3.connect("events.db")
    cursor = conn.cursor()

    cursor.execute("DELETE FROM students WHERE id=?", (id,))

    conn.commit()
    conn.close()

    return redirect("/admin")


# LOGOUT
@app.route("/logout")
def logout():
    session.pop("admin", None)
    return redirect("/")


# CONTACT PAGE
@app.route("/contact")
def contact():
    return render_template("contact.html")


if __name__ == "__main__":
    app.run(debug=True)