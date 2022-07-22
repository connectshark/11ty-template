---
title: 標籤
layout: 'layouts/tags.njk'
permalink: /tags/
eleventyExcludeFromCollections: true
---


{%- for tag in collections.tagList -%}
<li class=" inline-block m-2">
  <a class=" text-primary block border p-2 border-primary hover:bg-primary hover:text-white" href="/tags/{{ tag }}/">{{ tag }}</a>
</li>
{%- endfor -%}