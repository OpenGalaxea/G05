export function Autoregressive() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">From VLM-as-Encoder to VLM-as-Actor</h2>

      <div className="flex flex-col gap-6 text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        <p>
          Early VLA systems cast robot control as token generation: continuous actions were discretized, appended to the language vocabulary, and predicted by the VLM alongside text. This keeps the VLM itself the actor, but scales poorly — as control frequency, action horizon, and action dimensionality grow, per-timestep action tokens explode, making high-frequency control slow and expensive.
        </p>
        <p>
          This bottleneck pushed the field toward <strong className="text-white font-medium">VLM-as-Encoder</strong> architectures, where a pre-trained VLM supplies hidden states or visual-language context to a separately trained flow-matching or diffusion expert that predicts continuous action chunks. Action efficiency improves, but the VLM is no longer the action generator — it becomes a condition encoder, while the action distribution is produced by an expert with separate parameters and a separate objective. Core generative abilities — chain-of-thought reasoning, in-context learning, prompt-based motion steering — can then influence behavior only after passing through a compressed conditioning bottleneck.
        </p>
        <p>
          We therefore return to the autoregressive formulation, but remove the source of its original inefficiency: <strong className="text-white font-medium">excessive action tokenization</strong>. A learned vector-quantized codec compresses action chunks into compact discrete codes, and active degree-of-freedom prediction avoids spending tokens on joints that do not need to move. Together these choices slash the decoding burden while preserving the VLM as a generative actor.
        </p>
      </div>

      <blockquote className="border-l-4 border-brand-orange pl-8 py-3 my-12 bg-white/[0.02] rounded-r-2xl">
        <p className="text-xl md:text-2xl italic text-neutral-200 mt-0 mb-0 font-light leading-relaxed">
          "The path forward for VLA is not to place increasingly sophisticated action experts on top of an underused VLM, but to let the VLM remain what pretraining made it: an autoregressive reasoner that can also act, remember, and adapt in context."
        </p>
      </blockquote>

      <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight">Reasoning and action, one weight</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        Once reasoning and action share the same autoregressive stream, chain-of-thought becomes a native component of control rather than a bolt-on module. The model can zero-shot decompose an instruction into subtasks, identify task-relevant objects and their bounding boxes, and feed those intermediate predictions directly into subsequent action generation. A revealing thread in the VLM+expert literature points the same way: the <em>anti-forgetting</em> remedy of Knowledge Insulation reintroduces autoregressive action prediction precisely to protect the backbone — implicitly conceding that AR action supervision is the signal that keeps a VLM's capabilities intact.
      </p>
    </section>
  );
}
