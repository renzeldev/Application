from functools import wraps
from flask import request, make_response, jsonify
from flask_restful import abort

def verifyHeaders(func):
    """
    Middlewere for verifying that the request contains the correct headers
    """
    @wraps(func)
    def verifyHead(*args, **kwargs):
        acceptedContentTypes = ['application/json', 'application/merge-patch+json']
        if request.content_type not in acceptedContentTypes:
            if request.content_type is None:
                details = 'No media type in header, supported media types are: ' + ', '.join(acceptedContentTypes)
            else:
                details = str(request.content_type) + ' is an unsuported media type. Supported Media types are: ' + ', '.join(acceptedContentTypes)
            abort(make_response(jsonify({'status': 415, 'reason':details}), 415))
        elif request.method == 'PATCH' and request.content_type != 'application/merge-patch+json':
            abort(make_response(jsonify({'status': 415, 'reason':'application/merge-patch+json is requierd as content type on a PATCH request'}), 415))
        else:
            return func(*args, **kwargs)
    return verifyHead
