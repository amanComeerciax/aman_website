export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Applebot-Extended',
          'Google-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://www.mohammadaman.in/sitemap.xml',
  }
}
