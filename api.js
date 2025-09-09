export default {
  async generateMusic(apiKey, { prompt, style }) {
    const response = await fetch('https://api.kie.ai/suno/v1/music/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        style
      })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'API error');
    }
    return response.json();
  },
  async generateLyrics(apiKey, { prompt }) {
    const response = await fetch('https://api.kie.ai/suno/v1/lyrics/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'API error');
    }
    return response.json();
  },
  // Other API methods to be implemented similarly
};
