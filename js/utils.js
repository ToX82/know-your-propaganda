window.slugify = function(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/-+/g, '-');
};

window.createSlugMap = function(techniques, lang) {
  const slugMap = new Map();
  const usedSlugs = new Set();

  console.log('Creating slug map for language:', lang, 'with', techniques.length, 'techniques');

  techniques.forEach(t => {
    let slug = slugify(t.name);
    let counter = 1;
    let uniqueSlug = slug;
    while (usedSlugs.has(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    slugMap.set(uniqueSlug, t.id);
    usedSlugs.add(uniqueSlug);
  });

  console.log('Slug map created for', lang, 'with', slugMap.size, 'entries');
  console.log('Sample slugs:', Array.from(slugMap.keys()).slice(0, 5));

  return slugMap;
};

window.findTechniqueBySlug = function(lang, slug) {
  if (!window.slugMaps || !window.slugMaps[lang]) {
    console.warn('Slug map not found for language:', lang, 'slugMaps:', window.slugMaps);
    return null;
  }
  const slugMap = window.slugMaps[lang];
  const id = slugMap.get(slug);
  if (!id) {
    console.warn('Technique not found for slug:', slug);
    console.log('Available slugs:', Array.from(slugMap.keys()).slice(0, 10));
    return null;
  }
  return window.techniques.find(t => t.id === id);
};
