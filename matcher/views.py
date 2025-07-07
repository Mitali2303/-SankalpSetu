from django.shortcuts import render
from .matcher_utils import match_ngo

def ngo_matcher_view(request):
    if request.method == 'POST':
        query = request.POST.get('query')
        results = match_ngo(query)
        return render(request, 'matcher/matcher.html', {'results': results, 'query': query})
    return render(request, 'matcher/matcher.html')
