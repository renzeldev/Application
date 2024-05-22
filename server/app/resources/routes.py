from .capability import Capability, Capability_id, Capability_undo
from .name import Name

def init_routes(api):
    api.add_resource(Capability, '/capability')
    api.add_resource(Capability_id, '/capability/<string:id>')
    api.add_resource(Capability_undo, '/capability/undo/<string:id>')
    api.add_resource(Name, '/capability/name/<string:name>')
