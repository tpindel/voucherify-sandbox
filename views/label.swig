{% extends 'layout.swig' %}

{% block content %}
<table style="width:960px">
  <tr>
    <td><h1>{{ name }}</h1></th>
    <td><img border="0" src="https://dl.voucherify.io/api/v1/assets/qr/{{qr_id}}"></th> 
  </tr>
  <tr>
    <td colspan = "2">{{ uuid }}</td>
  </tr>
</table>
<br><br><br>

{% endblock %}
