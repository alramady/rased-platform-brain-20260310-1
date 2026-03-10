## Anti-Cheating Checklist

- [ ] لا توجد TODO/FIXME/STUB/MOCK في runtime
- [ ] كل tool endpoint يطبّق ToolEnvelope + schema validation
- [ ] كل completed job يمتلك evidence_id + artifacts
- [ ] strict يفرض PixelDiff==0 ولا يقبل threshold
- [ ] لا صور بديلة للنصوص/الجداول/المخططات في editable outputs
- [ ] policy/RBAC/guardrails لا يمكن bypass
- [ ] golden corpus pass
- [ ] UI Canvas pass: drop→actions≤300ms→plan→run→preview→result→evidence
- [ ] Focus Stage داخل نفس الصفحة
- [ ] Modal يمنع NAV/FOCUS
- [ ] Reduce motion يعطل particles
