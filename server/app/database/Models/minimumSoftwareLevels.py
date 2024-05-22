from ..db import db
from .deploymentPackage import DeploymentPackage

class MinimumSoftwareLevels(db.Document):
    component = db.StringField(required=True)
    deploymentPackage = db.ListField(db.ReferenceField(DeploymentPackage))
