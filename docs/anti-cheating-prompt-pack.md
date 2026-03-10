# Anti-Cheating Prompt Pack (PROMPT 2..PROMPT 7)

This repository now includes executable CI gate scripts aligned with the anti-cheating package:

- `scripts/ci/no_placeholders.sh`
- `scripts/ci/tool_schema_validate.ts`
- `scripts/ci/evidence_required_test.ts`
- `scripts/ci/strict_enforce_test.sh`
- `scripts/ci/no_silent_override.sh`
- `scripts/ci/golden_corpus_runner.ts`
- `scripts/golden/run.ts`

## CI workflow

`/.github/workflows/anti-cheating-ci.yml` runs the mandatory gates on pull requests and pushes.

## Golden corpus layout

- `golden_corpus/inputs/pdf`
- `golden_corpus/inputs/image_table`
- `golden_corpus/inputs/excel_bundle`
- `golden_corpus/inputs/video_sample_optional`
- `golden_corpus/expected/*.md`
