export function RobotGallery() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">7. Out-of-box Application</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        The unified action space lets a single set of weights deploy across distinct robot morphologies without changing the network. Combined with strong zero-shot instruction following, this turns G0.5 into a general-purpose manipulator straight out of the box.
      </p>

      <h3 id="pick-place" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">Pick up Anything &amp; Place Anywhere</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-6">
        A lightweight post-training pass on 50 hours of R1 Lite tabletop data yields an out-of-the-box <strong className="text-white font-medium">"Pick up Anything &amp; Place Anywhere"</strong> policy. Each scene contains 5–20 objects in arbitrary positions, and the policy must first ground the instructed target among distractors, then pick it and place it into the specified container.
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-6">
        Because instruction grounding is inherited from large-scale pre-training, the policy follows language <strong className="text-white font-medium">zero-shot</strong> — 65.6% language-following and 59.4% task success with no benchmark-specific data — and scales to 84.4% / 75.0% after 50 hours of post-training, outperforming π0.5 at every data scale (see the Pick-and-Place Benchmark in §5.5). Appending cropped visual context of the target object lifts language following to 98.4%, disambiguating long-tail items that language alone cannot.
      </p>
    </section>
  );
}
