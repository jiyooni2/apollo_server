export const processHashtag = (caption) => {
  const hashtags = caption.match(/#[\w]+/g);
  if (hashtags)
    return hashtags.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    }));
  else {
    return [];
  }
};
