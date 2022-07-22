---
title: 首頁
layout: 'layouts/base.njk'
pagination:
  data: collections.all
  size: 6
  alias: post
---
{%- for article in post -%}
<article>
  <figure class=" mb-4">
    <a href="{{ article.url }}">
      <img class="w-full h-max rounded-lg shadow max-h-80 object-cover" src="https://source.unsplash.com/random" alt="{{ article.data.title }}">
    </a>
  </figure>
  <h2 class=" text-xl font-bold"><a href="/tags/">{{ article.data.title }}</a></h2>
  <p class=" text-gray-500">{{ article.data.date | postDate }}</p>
  <p><i class='text-gray-500 items-center bx bxs-purchase-tag-alt'></i>{%- for tag in article.data.tags -%}<a href="/tags/{{ tag }}/" class="inline-block mx-2 hover:opacity-80">{{ tag }}</a>{%- endfor -%}</p>
</article>
{%- endfor -%}


<nav class=" lg:col-span-2 text-center">{% if page.url != pagination.href.first %}<a class="border text-2xl inline-block mx-2" href="{{ pagination.href.first }}"><i class='bx bx-first-page align-middle'></i></a>{% endif %}{% if pagination.href.previous %}<a class="border text-2xl inline-block mx-2" href="{{ pagination.href.previous }}"><i class='bx bx-chevron-left align-middle'></i></a>{% endif %}{% if pagination.href.next %}<a class="border text-2xl inline-block mx-2" href="{{ pagination.href.next }}"><i class='bx bx-chevron-left bx-rotate-180 align-middle' ></i></a>{% endif %}{% if page.url != pagination.href.last %}<a class="border text-2xl inline-block mx-2" href="{{ pagination.href.last }}"><i class='bx bx-first-page bx-rotate-180 align-middle' ></i></a>{% endif %}</nav>