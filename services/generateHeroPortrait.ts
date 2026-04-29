const MODEL = 'gemini-3-pro-image-preview';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const PROMPT = `Transform this photograph of a child's face into a brave young knight character for a fantasy storybook illustration. CRITICAL: keep the child's facial features clearly recognizable — same eyes, same face shape, same hair color and style, same approximate age, same skin tone, same expression. The knight wears polished medieval plate armor with subtle gold filigree accents. Painted illustration with soft warm rim-light, slight magical glow, set against a dark mossy forest background with hints of golden lantern light. Head and shoulders portrait, square composition, looking forward, gentle confident expression suitable for a children's adventure game. No text, no watermark.`;

export type GeneratedPortrait = {
  base64: string;
  mimeType: string;
};

export async function generateHeroPortrait(opts: {
  base64Photo: string;
  mimeType: string;
}): Promise<GeneratedPortrait> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Chybí EXPO_PUBLIC_GEMINI_API_KEY. Vytvoř .env soubor a restartuj dev server.',
    );
  }

  const response = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: PROMPT },
            {
              inline_data: {
                mime_type: opts.mimeType,
                data: opts.base64Photo,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini ${response.status}: ${errText.slice(0, 300)}`);
  }

  const json = await response.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    const inline = part.inlineData ?? part.inline_data;
    if (inline?.data) {
      return {
        base64: inline.data,
        mimeType: inline.mimeType ?? inline.mime_type ?? 'image/png',
      };
    }
  }

  const reason =
    json?.promptFeedback?.blockReason ??
    json?.candidates?.[0]?.finishReason ??
    'no image in response';
  throw new Error(`Gemini nevrátil obrázek (${reason}).`);
}
