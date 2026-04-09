export default function (babel) {
  const { types: t } = babel;

  return {
    name: "split-variable-declarations",
    visitor: {
      VariableDeclaration(path) {
        const decls = path.node.declarations;
        if (decls.length <= 1) return; // nada que dividir
        const newDecls = decls.map((decl) =>
          t.variableDeclaration(path.node.kind, [decl]),
        );
        path.replaceWithMultiple(newDecls);
      },
    },
  };
}
