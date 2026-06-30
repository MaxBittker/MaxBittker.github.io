// Mirrors gatsby-remark-images `showCaptions: true`: a markdown image that is
// alone in a paragraph becomes a <figure> whose <figcaption> is the alt text.
// Raw inline <img> tags (inside their own HTML blocks) are left untouched.

const isWhitespaceText = (node) =>
  node.type === "text" && node.value.trim() === "";

export default function rehypeFigureCaptions() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.tagName === "p") {
          const significant = child.children.filter((c) => !isWhitespaceText(c));
          if (significant.length === 1 && significant[0].tagName === "img") {
            const img = significant[0];
            const alt = (img.properties && img.properties.alt) || "";
            const figureChildren = [img];
            if (alt.trim()) {
              figureChildren.push({
                type: "element",
                tagName: "figcaption",
                properties: {},
                children: [{ type: "text", value: alt }],
              });
            }
            return {
              type: "element",
              tagName: "figure",
              properties: {},
              children: figureChildren,
            };
          }
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}
