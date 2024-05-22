from urllib import parse

def parseQuery(queryParams):
    """
    Function for parsing the query paramas in the
    url, for filtering, fields, sorting, ...
    """
    queries = parse.unquote(queryParams.decode('utf-8'))
    params = dict(item.split("=") for item in queries.split("&")) if queries != '' else {}
    fields = params['fields'].split(',') if 'fields' in params else None
    limit = int(params['limit']) if 'limit' in params and params['limit'].isnumeric() else None
    if 'sf' in params and params['sf'] != '':
        sf = '-' + params['sf'] if 'sd' in params and params['sd'] ==  'des' else '+' + params['sf']
    else:
        sf = None

    [params.pop(key, None) for key in ['fields', 'sf', 'sd', 'limit']]
    [params.update({key.replace('.', '__'):params.pop(key)}) for key in list(params)]

    return params, fields, sf, limit

def filterFields(res, fields):
    """
    Takes the Queried document/s and filters out the properties
    based on a fileds list
    """
    if type(res) is list:
        return [{field:value for field, value in cap.items() if field in fields} for cap in res]
    else:
        return {field:value for field, value in res.items() if field in fields}

