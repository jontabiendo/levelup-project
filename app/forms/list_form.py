from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length

class ListForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=50)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=255)])
    category = SelectField("Category", choices=[("Work", "Work"), ("Finance", "Finance"), ("Personal", "Personal"), ("Chores", "Chores"), ("Productivity", "Productivity"), ("Groceries", "Groceries"), ("Entertainment", "Entertainment")])
    is_public = BooleanField("Public")
