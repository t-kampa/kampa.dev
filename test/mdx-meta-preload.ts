import { plugin } from "bun";
import { extractMetaSource } from "../src/lib/mdx";

/**
 * `bun test` has no MDX loader. Blog logic only ever reads the `meta` export
 * from these files, so stub the MDX module down to that instead of pulling
 * in the full @mdx-js compile pipeline just for tests.
 */
plugin({
  name: "mdx-meta-stub",
  setup(build) {
    build.onLoad({ filter: /\.mdx$/ }, async (args) => {
      const source = await Bun.file(args.path).text();
      const metaSource = extractMetaSource(source, args.path);

      return {
        contents: `export const meta = ${metaSource};\nexport default function MdxStub() { return null; }`,
        loader: "ts",
      };
    });
  },
});
