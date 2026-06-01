export function Distributions() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">4. Pre-training</h2>
      <div className="flex flex-col gap-6 text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        <p>
          G0.5 is pre-trained in a single stage on a heterogeneous mixture of robot demonstrations and web-scale vision–language data. The robot portion covers <strong className="text-white font-medium">14 embodiments</strong> across real and simulated ontologies, all cast into a single 27-dimensional unified action space — partitioned as <code className="bg-surface/60 px-2 py-1 rounded-md text-brand-orange-light font-mono text-[15px] border border-white/10 mx-0.5">left_control(9) | left_gripper(1) | right_control(9) | right_gripper(1) | lower_body(7)</code> — so robots of differing morphology share one output head without per-robot adapters.
        </p>
        <p>
          An automated labeling pipeline turns raw episodes into multi-granularity annotations: rule-based segmentation plus multimodal APIs (Gemini 3, Doubao Seed 2.0 Pro) produce action hints and atomic/episode instructions, foundation models with SAM3 tracking generate per-frame bounding boxes, and forward kinematics projects bimanual end-effector traces onto the image plane. To retain general language ability we co-train with roughly <strong className="text-white font-medium">100M vision–language samples</strong> (generic + embodied VQA) at a 1:4 VQA-to-action ratio, all under the same next-token objective. Each robot sample is assigned one of eight CoT formats by weighted sampling, with subtask-text weighted most heavily.
        </p>
      </div>

      <figure className="mb-12">
        <div className="relative">
          {/* soft brand glow so the light panel reads as intentional on the dark page */}
          <div className="absolute -inset-4 rounded-[2.5rem] bg-brand-orange/[0.06] blur-3xl pointer-events-none" />
          {/* white studio panel — kept white so the white robots blend in with no fringing */}
          <div className="relative bg-white rounded-3xl p-6 md:p-10 ring-1 ring-black/10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
            <img src="images/embodiments.png" alt="Robot platforms represented in pre-training" loading="lazy" className="w-full h-auto select-none pointer-events-none" referrerPolicy="no-referrer" />
          </div>
        </div>
        <figcaption className="mt-4 text-sm font-mono text-neutral-500 text-center tracking-wide">
          The 14 real and simulated robot platforms that make up the pre-training mixture, from single arms to bimanual mobile manipulators and full-size humanoids.
        </figcaption>
      </figure>

      <p className="text-sm text-neutral-500 font-light leading-relaxed mb-12 border-l-2 border-white/10 pl-4">
        <span className="font-mono text-neutral-400">Recipe.</span> Trained with AdamW under a single cross-entropy objective (plus the auxiliary flow-matching loss) for ~120K steps. Observations are 6 frames sampled at 1 s over a 5 s window; 30% of memory frames are dropped as regularization for the visual-memory module.
      </p>

      <figure className="mb-4">
        <div className="bg-[#0d0d0d] rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl">
          <img src="images/data_analyze.png" alt="Top-50 action verbs and object nouns in the pre-training corpus" loading="lazy" className="w-full h-auto rounded-lg select-none pointer-events-none" referrerPolicy="no-referrer" />
        </div>
        <figcaption className="mt-3 text-sm font-mono text-neutral-500 text-center tracking-wide">
          Top-50 action verbs and object nouns in the pre-training corpus (log scale). Both follow a long-tailed distribution — dominated by manipulation primitives (pick, place, move) and everyday household objects, with a diverse tail of rarer skills.
        </figcaption>
      </figure>
    </section>
  );
}
