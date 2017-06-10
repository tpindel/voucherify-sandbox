{% extends 'layout.swig' %}

{% block content %}
<table style="width:100%">
  <tr>
    <td><h1>{{ name }}</h1></th>
    <td><img border="0" src="{{qr}}"></th> 
  </tr>
  <tr>
    <td colspan = "2">{{ uuid }}</td>
  </tr>
</table>
<br><br><br>

{% endblock %}
