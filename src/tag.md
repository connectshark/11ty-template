---
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - tagList
    - all
permalink: /tags/{{ tag }}/
eleventyExcludeFromCollections: true
layout: layouts/tag.njk
---
<ol>
{% set taglist = collections[ tag ] %}
{% for post in taglist | reverse %}
  <li class=" inline-block m-4 p-3 border border-primary">
    <a href="{{ post.url | url }}">
      <h2 class="text-xl">{{ post.data.title }}</h2>
      <p><span class=" text-gray-500">{{ post.data.date | postDate }}</span></p>
    </a>
  </li>
{% endfor %}
</ol>