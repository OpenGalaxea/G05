import { motion } from 'motion/react';

export function InteractiveDiagram() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">3. Introducing G0.5</h2>
      <div className="flex flex-col gap-6 text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        <p>
          Recent VLA models have demonstrated increasingly capable manipulation, yet most remain heavily dependent on post-training: reliable execution typically requires extensive fine-tuning for each target task, scene, and embodiment. We argue this dependence is, in part, a consequence of how action is attached to a pretrained VLM—usually as a separate regression head or diffusion expert—rather than learned natively within the same model that already understands vision and language.
        </p>
        <p>
          G0.5 takes a different stance. It is a fully autoregressive (AR) VLA in which perception, language, reasoning, and action share a single set of parameters and a single next-token objective. Built on a Qwen3.5-2B backbone, G0.5 represents actions as discrete tokens in the same vocabulary as text and spatial tokens, so images, instructions, intermediate reasoning, and actions are all produced by one unified AR model (Fig. 1). An optional flow-matching action expert can be attached for high-rate continuous control, but the AR pathway is primary. Training action and language jointly encourages tighter cross-modal alignment, scales more efficiently with data, and lets the policy inherit the planning, reasoning, and zero-shot abilities of the VLM.
        </p>
        <p>
          This motivates our broader goal: moving from post-training to zero-shot generalization. Rather than memorizing tasks via per-task fine-tuning, G0.5 acquires composable, transferable atomic skills (grasp, place, push/pull, open/close, locomotion) through large-scale multi-task pretraining and multimodal alignment, applying them zero-shot to some unseen objects, scenes, and instructions. Three components are central; we preview them here.
        </p>
      </div>

      {/* Model Architecture Diagram (Figure 1) */}
      <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 md:p-10 mb-12 flex flex-col items-center justify-center gap-4 shadow-xl">
        <div className="w-full max-w-5xl relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 p-2 md:p-4">
          <img 
            src="/images/g05_arch.svg" 
            alt="G0.5 Model Architecture Diagram" 
            className="w-full h-auto object-contain select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-sm font-mono text-neutral-500 text-center tracking-wide">
          Figure 1: Unified autoregressive Vision-Language-Action (VLA) architecture and joint reasoning framework of G0.5
        </span>
      </div>

      <h3 id="faster-actioncodec" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">3.1 Faster-ActionCodec (→ Fig. 2)</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        A pure-AR policy requires discretizing continuous actions, and the tokenizer bounds policy quality. Naive schemes trade off reconstruction accuracy vs. temporal consistency, and aggressive quantization causes mode-shifting (adjacent tokens jumping between codes → jerky motion). Building on our prior FASTer and ActionCodec, Faster-ActionCodec encodes an action chunk via a block-DCT front-end and a residual VQ codec; its key addition is a temporal consistency loss that enforces continuity between neighboring action tokens, suppressing mode-shifting while preserving fidelity. Tokens are compact, smooth, and share the unified vocabulary.
      </p>

      {/* ActionCodec Tokenizer Architecture Diagram */}
      <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 md:p-10 mb-12 flex flex-col items-center justify-center gap-4 shadow-xl">
        <div className="w-full max-w-4xl relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 p-2 md:p-4">
          <img 
            src="/images/g05_dark_fig3.svg" 
            alt="ActionCodec Tokenizer Architecture Diagram" 
            className="w-full h-auto object-contain select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-sm font-mono text-neutral-500 text-center tracking-wide">
          Figure 2: Workflow representation and structural pipeline of the Faster-ActionCodec tokenizer within G0.5
        </span>
      </div>

      <h3 id="long-history-context" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">3.2 Long-history context (→ Fig. 1)</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        Single-frame observations obscure motion direction, partial observability, and task progress. G0.5 conditions on a history of observations: recent frames feed the vision encoder, and proprioceptive history is encoded as multiple state tokens—one per historical timestep via a lightweight MLP—so the sequence carries an explicit record of recent state. Following π-mem, this gives a short-term memory that improves temporal reasoning and robustness within a single AR backbone.
      </p>

      <h3 id="action-reasoning" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">3.3 Action reasoning (→ Fig. 1)</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        To ground language/perception in action and stay robust to prompt phrasing, G0.5 also reasons about the scene and decomposes tasks. It jointly predicts an action hint (near-future motion in language), 2D bounding boxes of interaction objects, the atomic task, the high-level task, and a 2D end-effector trace (eef pose projected through the URDF onto the image). These are taught via (i) VQA pairs and (ii) five training templates (e.g., subtask+action from image; bbox+subtask+action from observation; action hint; 2D trace; atomic task from high-level goal). This tightens the language–observation–action link, improving grounding and prompt robustness.
      </p>
    </section>
  );
}
