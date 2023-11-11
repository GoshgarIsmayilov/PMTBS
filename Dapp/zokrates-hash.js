import { initialize } from 'zokrates-js';

export default async function zokrates_hash(left, right) {
  const hash = initialize().then((zokratesProvider) => {
    const source = 'import "hashes/sha256/512bit" as sha256;\n\
                    import "utils/pack/u32/pack256" as pack256;\n\
                    def main(private u32[8] left, private u32[8] right) -> field {\n\
                        u32[8] computedCommitmentUnpacked = sha256(left[0..8], right[0..8]);\n\
                        field computedCommitment = pack256(computedCommitmentUnpacked);\n\
                        return computedCommitment;\n\
                    }'

    const artifacts = zokratesProvider.compile(source);
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [left, right]);
    return output;
  });
  return hash;
}