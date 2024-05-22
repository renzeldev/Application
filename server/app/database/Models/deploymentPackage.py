from ..db import db

class DeploymentPackage(db.Document):
    name = db.StringField()
    packageLink = db.URLField()
    version = db.StringField()
