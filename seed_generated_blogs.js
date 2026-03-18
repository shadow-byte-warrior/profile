import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const blogs = [
  {
    title: "The Power of \"Why?\"",
    slug: "power-of-why",
    imagePath: "C:/Users/Rishi/.gemini/antigravity/brain/b947895d-02ec-4ad0-bfef-9e2112eb4746/curiosity_journey_img_1773817737490.png",
    content: `I remember the day I realized that code isn't just about syntax—it's about answers. 

As an AI student, I spent months memorizing algorithms and mathematical proofs. But it wasn't until I sat down to build a simple recommendation system that things finally clicked. I wasn't just writing logic; I was trying to understand how a machine "thinks." I spent late nights asking why a certain weight adjusted or why a loss function spiked. This obsessive curiosity led me to build my first real project, a healthcare prediction system. It wasn't perfect, but it taught me that every line of code is a response to a question. 

**Insight**: Curiosity is the best debugger. If you stop asking "why," you stop growing as a builder. Never settle for code that "just works"—understand why it does.`
  },
  {
    title: "Decoding Brain Waves",
    slug: "decoding-brain-waves",
    imagePath: "C:/Users/Rishi/.gemini/antigravity/brain/b947895d-02ec-4ad0-bfef-9e2112eb4746/eeg_project_img_1773817753477.png",
    content: `Staring at brain waves on a screen felt like trying to read a new language in the dark. 

My EEG seizure prediction project was one of the steepest learning curves I’ve ever faced. Dealing with raw medical data is incredibly messy—it’s full of noise, artifacts, and overwhelming uncertainty. There were many times I wanted to quit when the model accuracy refused to budge despite my best efforts. But then, after weeks of Refining the processing pipeline and experimenting with different architectures, I started to see the hidden patterns. Capturing that first predictable onset felt like a massive breakthrough. It taught me that real-world problems don't come in clean datasets; they require patience and deep intuition.

**Insight**: Data is just noise until you find its pulse. Accuracy doesn't come just from the code, but from truly understanding the context of the problem you are solving.`
  },
  {
    title: "The Deployment Reality Check",
    slug: "deployment-reality-check",
    imagePath: "C:/Users/Rishi/.gemini/antigravity/brain/b947895d-02ec-4ad0-bfef-9e2112eb4746/ml_deployment_img_1773817768653.png",
    content: `Deploying my first machine learning model taught me more than any textbook or online course ever could. 

We’ve all been there: the model hits 95% accuracy on your local machine, but the moment you try to integrate it into a real-time application, everything breaks. During my internship, I spent days debugging why a perfectly trained model was lagging significantly in a production environment. I had to quickly learn about backend infrastructure, API latency, and how to make AI actually usable for end-users. It wasn't just about the "intelligence" of the model anymore; it was about the resilience of the engineering surrounding it.

**Insight**: A model is only as good as the system it lives in. Great AI requires even greater engineering. Focus on the integration as much as the implementation.`
  },
  {
    title: "The Pivot to Clarity",
    slug: "pivot-to-clarity",
    imagePath: "C:/Users/Rishi/.gemini/antigravity/brain/b947895d-02ec-4ad0-bfef-9e2112eb4746/data_analytics_shift_img_1773817787834.png",
    content: `I spent years building complex AI swarms, but I eventually found my true passion in the actual stories data tells. 

People often ask why I’m shifting my focus from deep AI towards Data Analytics. The truth is, I love building models, but I love solving tangible business problems more. Whether it's using SQL to uncover a hidden trend or building a Power BI dashboard that changes a critical decision, the impact is immediate and visible. I’m now spending my time mastering Python for analysis and Excel for logic because I want to bridge the gap between "hard tech" and "real-world value." It's about making sense of the chaos.

**Insight**: Value isn't in the complexity of the tool you use, but in the clarity of the answer you provide. Sometimes, a well-designed chart is more powerful than a hundred neural layers.`
  },
  {
    title: "Code is a Team Sport",
    slug: "code-is-a-team-sport",
    imagePath: "C:/Users/Rishi/.gemini/antigravity/brain/b947895d-02ec-4ad0-bfef-9e2112eb4746/internship_learning_img_1773817802441.png",
    content: `On my very first day at my internship, I realized that industrial-grade code is a team sport, not a solo marathon. 

Coming from academic projects where I wrote every single line myself, the shift to a professional environment was eye-opening and humbling. Suddenly, my "creative" variable names and lack of documentation didn't fly anymore. I learned that writing code that simply works is the bare minimum—writing code that others can actually read, trust, and maintain is the real professional challenge. I saw firsthand how a team builds secure healthcare systems by following strict protocols and helping each other grow, rather than relying on raw talent alone.

**Insight**: Code is for people, not just for machines. Technical skill might get you the job, but communication and empathy are what keep the system running smoothly.`
  }
];

async function seed() {
  for (const blog of blogs) {
    const fileName = path.basename(blog.imagePath);
    const fileBuffer = fs.readFileSync(blog.imagePath);

    console.log(`Uploading ${fileName}...`);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error(`Error uploading ${fileName}:`, uploadError.message);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log(`Inserting blog: ${blog.title}...`);
    const { error: insertError } = await supabase
      .from('blogs')
      .insert({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        cover_url: publicUrl,
        is_published: true
      });

    if (insertError) {
      console.error(`Error inserting ${blog.title}:`, insertError.message);
    } else {
      console.log(`Successfully added ${blog.title}`);
    }
  }
}

seed();
