{% component image_thumb(path: string, caption: string) -%}
{% set thumb = resize_image(path=path, width=600, height=10, op="fit_width") %}
{% set image = resize_image(path=path, width=5000, height=5000, op="fit") %}
<figure>
    <a href="{{ image.url }}" ><img src="{{ thumb.url }}" alt="{{ caption }}" /></a>
    {% if caption %}<figcaption>{{ caption }}</figcaption>{% endif %}
</figure>
{% endcomponent %}
