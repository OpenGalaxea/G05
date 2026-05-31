export function Autoregressive() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">From post-training to zero-shot generalization</h2>
      
      <div className="flex flex-col gap-6 text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        <p>
          Traditional robotic models have heavily relied on task-specific post-training alignment, requiring extensive fine-tuning tailored to specific tasks, environments, and robot embodiments to exhibit stable orchestration. By contrast, <strong>the core breakthrough of G0.5 lies in</strong> achieving robust multimodal alignment solely through large-scale, multi-task generative pre-training. This shift equips the model with highly transferable, modular manipulation primitives that natively generalize to unseen tasks and atomic actions under zero-shot conditions.
        </p>
        <p>
          This implies that robots are no longer relying on downstream adaptation or "memorizing" individual scenarios; instead, they establish a fundamental understanding of manipulation semantics, visual targets, and trajectory patterns through unsupervised pre-training. <strong>Atomic policies such as grasping, placing, pushing, sliding, lifting, and aligning</strong> are crystallized as reusable behavioral units, seamlessly invoked across novel objects, complex environments, and dynamic natural language instructions.
        </p>
        <p>
          The significance of G0.5 goes beyond dramatic upgrades in out-of-the-box physical execution; it validates a highly scalable trajectory for general-purpose embodied intelligence: <strong>constructing a universal foundation for robotic manipulation via massive pre-training</strong>, thereby shifting the paradigm of embodied foundation models from "post-training-dependent task adaptation" toward "pre-training-driven zero-shot physical generalization."
        </p>
      </div>
      
      <blockquote className="border-l-4 border-brand-orange pl-8 py-3 my-12 bg-white/[0.02] rounded-r-2xl">
        <p className="text-xl md:text-2xl italic text-neutral-200 mt-0 mb-0 font-light leading-relaxed">
          "The true bottleneck of embodied AI has never been fine-tuning, but the lack of a universal pre-trained base. Zero-shot physical generalization is a native emergent property of internet-scale pre-training."
        </p>
      </blockquote>

      <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight">Pre-trained Physical Commonsense</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        We convert continuous action vectors into discrete spatial tokens, allowing us to utilize autoregressive likelihood modeling techniques proved superior in general LLMs. By predicting the next discrete action token <code className="bg-surface/60 px-2 py-1 rounded-md text-brand-orange-light font-mono text-base border border-white/10 mx-1">a_t</code> conditioned on observation sequences <code className="bg-surface/60 px-2 py-1 rounded-md text-brand-orange-light font-mono text-base border border-white/10 mx-1">o_{'{'}&lt;t{'}'}</code>, G0.5 embeds a native understanding of gravity, contact force, and geometric affordance into its parameter space.
      </p>
    </section>
  );
}
