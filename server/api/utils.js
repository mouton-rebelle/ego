export const slugify = (text) => {
  return text
    .replace(/[\/ \-']/g, '_')
    .replace(/[éêëè]/gi, 'e')
    .replace(/[îï]/gi, 'i')
    .replace(/ç/gi, 'c')
    .replace(/[àâä]/gi, 'a')
    .replace(/[û]/gi, 'u')
    .replace(/[ôö]/gi, 'o')
    .replace(/[()\|\[\]\!\.\?,\"°]/gi, '').toLowerCase()
}
