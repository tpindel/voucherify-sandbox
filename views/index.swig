{% extends 'layout.swig' %}

{% block content %}
  <h1>{{ title }}</h1>
  <p>Welcome to {{ title }}</p>
<!--https://app.voucherify.io-->
    <iframe allowtransparency="true"
        src="http://127.0.01:3000/widgets/subscribe?[options][client-app-id]=c8b4dd4e-fe4a-45f4-8cd7-f8a0b20c6479&[options][client-token]=e3e79304-a1bb-4098-a740-9b8020295579&[options][address-line-1-field]=true&[options][address-line-2-field]=true&[options][source]=Subscribe_form_1&[options][metadata]={'test':true}"
        name="voucherifySubscribeVoucherWidget"
        id="voucherifySubscribe"
        marginheight="0"
        scrolling="no"
        frameborder="0" width="1000px" height="1000px" style="width: 400px; height: 430px;"></iframe>

{% endblock %}
