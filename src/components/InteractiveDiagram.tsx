export function InteractiveDiagram() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">3. G0.5 Model Design</h2>
      <div className="flex flex-col gap-6 text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        <p>
          G0.5 is built around a single commitment: perception, reasoning, and action should be unified within one autoregressive process over a shared token vocabulary. Initialized from <strong className="text-white font-medium">Qwen3.5-2B</strong>, the model consumes a short temporal window of multi-view RGB, an embodiment identifier, a natural-language instruction, and a proprioceptive state, then autoregressively generates a structured output that ends in discrete action codes.
        </p>
        <p>
          Everything is serialized into one token sequence: a <em>conditioning segment</em> (images, embodiment, task, state — in user-side chat tokens) and a <em>generative segment</em> (an optional chain-of-thought trace followed by action codes — in assistant-side tokens). Training applies a single next-token cross-entropy loss over the generative segment only. Crucially, this one loss jointly supervises CoT and actions: there is no separate action head, no auxiliary regression objective, and no expert distillation — CoT traces and actions are all "just tokens" drawn from the same vocabulary and produced by the same forward pass. The action codes are decoded by our cross-embodiment ActionCodec into a unified action space; an optional flow-matching head conditioned on the AR trunk can further refine actions for latency-critical deployment.
        </p>
      </div>

      {/* Token sequence schematic */}
      <figure className="my-12">
        <div className="bg-white rounded-2xl p-5 md:p-8 border border-white/10 shadow-2xl">
          <img
            src="images/method.png"
            alt="G0.5 token sequence: conditioning and generative segments"
            className="w-full h-auto rounded-lg select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <figcaption className="mt-3 text-sm font-mono text-neutral-500 text-center tracking-wide">
          Figure 1: All inputs and outputs serialize into one sequence — a conditioning segment (multi-view RGB, embodiment, task, state) and a generative segment (optional CoT trace, then active-DoF action codes). A single next-token cross-entropy loss is applied to the generative segment only.
        </figcaption>
      </figure>

      <h3 id="action-codec" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">3.1 Cross-Embodiment Action Codec</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        A pure-AR policy must discretize continuous actions, and most prior schemes flatten the whole action space into one vector before quantization — entangling action semantics and making token count scale with total DoFs even though only a few joints move at any step. Adopting the action-grouping strategy of FASTer together with the ActionCodec training recipe, G0.5 instead decomposes each robot into independent <strong className="text-white font-medium">motion parts</strong> (left arm, right arm, lower body), pads each part to a shared dimensionality, and trains a <strong className="text-white font-medium">residual vector-quantization (RVQ)</strong> model over the grouped actions. A temporal contrastive objective improves token consistency across adjacent motions, so semantically similar actions map to nearby codes rather than jumping erratically. Structural special tokens such as <code className="bg-surface/60 px-2 py-1 rounded-md text-brand-orange-light font-mono text-base border border-white/10 mx-1">&lt;left_control_n&gt;</code> let the model emit only the parts that are actively moving — inactive parts stay still without spending any tokens.
      </p>

      {/* Cross-embodiment action layout (fixed slots + zero-padding) */}
      <figure className="my-12">
        <div className="bg-[#0d0d0d] rounded-3xl p-5 md:p-8 border border-white/10 shadow-2xl flex justify-center">
          <img
            src="images/g05_action_layout.svg"
            alt="Cross-embodiment action layout: fixed per-part slots with zero-padding"
            className="w-full max-w-md h-auto select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <figcaption className="mt-3 text-sm font-mono text-neutral-500 text-center tracking-wide">
          Figure 2: Cross-embodiment action layout. Every robot is mapped onto the same fixed part slots — left/right arm, grippers, lower body — with each part padded to a shared max dimensionality (real DoFs filled, the rest zero-padded). This yields one unified action vector of fixed dimension across embodiments, which the ActionCodec then tokenizes.
        </figcaption>
      </figure>

      {/* Action codec pipeline */}
      <figure className="my-12">
        <div className="bg-white rounded-2xl p-5 md:p-8 border border-white/10 shadow-2xl">
          <img
            src="images/tokenizer.png"
            alt="Cross-embodiment ActionCodec pipeline"
            className="w-full h-auto rounded-lg select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <figcaption className="mt-3 text-sm font-mono text-neutral-500 text-center tracking-wide">
          Figure 3: The cross-embodiment ActionCodec. Activated motion parts are padded to a shared layout, encoded with a time-contrastive objective, quantized by a residual vector quantizer, and decoded back — emitting structured per-part tokens (<code className="text-[12px]">&lt;part_n&gt;</code>) for only the active DoFs.
        </figcaption>
      </figure>

      <h3 id="native-cot" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">3.2 Native Chain-of-Thought</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        Rather than treating reasoning annotations as isolated training-time supervision, G0.5 folds them directly into the action stream. Before predicting actions, the model can optionally emit any subset of four self-describing reasoning targets — an atomic <strong className="text-white font-medium">subtask</strong>, key-object <strong className="text-white font-medium">bounding boxes</strong>, a 2D end-effector <strong className="text-white font-medium">trace</strong>, and a frame-level <strong className="text-white font-medium">action hint</strong> — sampled per step from eight CoT formats (including a no-CoT baseline). Because these tokens share the decoder, context, and objective with the action tokens, reasoning and action are not separate stages but coupled phases of one generative process. The resulting CoT generalizes zero-shot: on unseen scenes the model produces accurate subtasks and grounds task-relevant objects, and enabling CoT consistently improves instruction following and action accuracy on complex manipulation.
      </p>

      <figure className="my-12">
        <div className="bg-[#0a0a0a] rounded-2xl p-3 md:p-4 border border-white/10 shadow-2xl">
          <img
            src="images/teaser.png"
            alt="G0.5 operation interface: interleaved chain-of-thought and action tokens"
            className="w-full h-auto rounded-lg select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <figcaption className="mt-3 text-sm font-mono text-neutral-500 text-center tracking-wide">
          Figure 4: The unified action stream in operation. For each observation the model emits a native chain-of-thought — a subtask and bounding-box grounding — immediately before the action tokens, then re-plans closed-loop from the next frame.
        </figcaption>
      </figure>

      <h3 id="visual-memory" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">3.3 Visual Memory</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        Complex mobile manipulation is non-Markovian: single-frame observations fail under temporary occlusions and lack the context needed to recognize failures and retry. Naively stacking historical vision tokens scales quadratically and invites error accumulation. Following π0.7 and MEM, G0.5 inserts factorized spatial and temporal attention modules every four layers of the Vision Transformer, sequentially mixing information across time steps and spatial patches. To bound latency, all historical tokens are discarded at the final layer, and all history frames are stochastically dropped during training to prevent overfitting; continuous state embeddings replace discrete text tokenizers so proprioception stays synchronized with the corresponding visual frames.
      </p>
    </section>
  );
}
