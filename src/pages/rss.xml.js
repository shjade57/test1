import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

function getSlug(id) {
  return id.replace(/\.(mdx|md)$/, '');
}

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'My Tech Blog',
    description: '个人技术博客 - 技术思考与学习记录',
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${getSlug(post.id)}`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
