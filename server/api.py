from os import getenv
from app import create_app

app = create_app()

app.run(debug=True if getenv('FLASK_ENV', 'dev')=='dev' else False,host='0.0.0.0')
