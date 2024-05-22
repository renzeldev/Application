from ..db import db
from .minimumSoftwareLevels import MinimumSoftwareLevels
from datetime import datetime

class Capability(db.Document):
    """
    db schema model for a capabilitiy that will be saved in the db
    """
    name = db.StringField(required=True, unique=True)
    category = db.StringField(required=True, choices=['Integration Capabilities',
    'System Capabilities',
    'Product Capabilities',
    'Deployment Capabilities'])
    state = db.StringField(choices=['New', 'Published', 'Deprecated'])
    description = db.StringField()
    tags = db.ListField(db.StringField())
    beamCompoundSemanticVersion = db.StringField(required=True)
    minimumSoftwareLevels = db.ListField(db.ReferenceField(MinimumSoftwareLevels, required=True), required=True,  dbref = True )
    supportingDocuments = db.ListField(db.URLField(required=True))
    created = db.DateTimeField(default=datetime.utcnow)
    updated = db.DateTimeField(default=None)
    deleted = db.DateTimeField(default=None)
