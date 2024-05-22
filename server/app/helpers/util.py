
def fixId(res):
    """
    Function to make the returned id in res look better
    instead of "_id": {"$oid": "onvdovnsd"}, it will look like "id": "vlsdvnsl"
    """
    if type(res) is list:
        res = [{'id' if k == '_id' else k:v for k,v in res[i].items()} for i in range(len(res))]
        for r in res:
            r['id'] = r['id']['$oid']
    else:
        res = {"id" if k == '_id' else k:v for k,v in res.items()}
        res['id'] = res['id']['$oid']
    return res
