from flask_login import UserMixin
from flask import current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from .. import login

class User(UserMixin):
  def __init__(self, id, email, username, firstname, lastname, time_created):
    self.id = id
    self.email = email
    self.username = username
    self.firstname = firstname
    self.lastname = lastname
    self.time_created = time_created

  @staticmethod
  def get(id):
    rows = app.db.execute('''
                          SELECT *
                          FROM Users
                          WHERE id=:id
    ''',
    id=id)
    
    return User(*(rows[0]) if rows else None)

  @staticmethod
  def get_by_auth(email, password):
    rows = app.db.execute('''
      SELECT password
      FROM Users
      WHERE email = :email
    ''', email=email)

    if not rows:
      return None
    elif not check_password_hash(rows[0][0], password):
      # incorrect password
      return None

    else:
      rows = app.db.execute('''
        SELECT *
        FROM Users
        WHERE email = :email
      ''', email=email)
      
      return rows if rows else None
    
  @staticmethod
  def register(email, username, firstname, lastname, time_created):
    try:
      rows = app.db.execute('''
        INSERT INTO Users(email, username, firstname, lastname, time_created)
        VALUES (:email, :username, :firstname, :lastname, :time_created)
        RETURNING id                          
      ''',
      email=email,
      username=username,
      firstname=firstname,
      lastname=lastname,
      time_created=time_created)

      return rows if rows else None
    except Exception as e:
      print('error in register: ')
      print(e)
      return None