import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Upload, Sliders, Download, Lock } from "lucide-react"
import DemoSection from "@/components/DemoSection";

export default function Home() {
  return (
    <>
     {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  On-The-Fly Image Optimization
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Transform, resize, and optimize your images instantly with simple URL parameters. No complex setup
                  required.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/upload"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  View Documentation
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] overflow-hidden rounded-lg border bg-background p-2 shadow-xl">
                <div>
                <div className="flex items-center justify-between border-b pb-2 flex-col">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Image Preview</div>
                    </div>
                  <div className="p-2 flex border-gray-500 border-[1px] rounded-lg m-2 w-full">
                      <Lock className="text-green-500 mx-2" /> 
                      <p className="text-gray-400">https://example/img/dio45-ald04?h=500?q=90</p>
                      </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-center">
                  <Image
                    src="/mount-fuji.webp"
                    alt="Image Preview"
                    width={400}
                    height={300}
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Optimize your images in three simple steps with our powerful URL-based parameters
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold">Upload Your Image</h3>
              <p className="text-muted-foreground">
                Upload your image to our service and receive a unique URL for your optimized image.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sliders className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold">Add URL Parameters</h3>
              <p className="text-muted-foreground">
                Customize your image by adding parameters to the URL to control width, height, quality, and more.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Download className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold">Use Optimized Image</h3>
              <p className="text-muted-foreground">
                Your image is instantly optimized and ready to use in your website or application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* URL Parameters Demo Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">URL Parameters</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transform your images on-the-fly by simply adding parameters to the URL
              </p>
            </div>
          </div>
          {/* DEMO */}
          <DemoSection/>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need for powerful image optimization
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Instant Resizing</h3>
              <p className="text-muted-foreground">Resize images on-the-fly with simple width and height parameters</p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Format Conversion</h3>
              <p className="text-muted-foreground">
                Convert between formats like JPEG, PNG, WebP, and AVIF automatically
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Quality Control</h3>
              <p className="text-muted-foreground">
                Adjust compression quality to balance between file size and visual fidelity
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Smart Cropping</h3>
              <p className="text-muted-foreground">
                Automatically focus on the important parts of your image when cropping
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Global CDN</h3>
              <p className="text-muted-foreground">Lightning-fast delivery with our global content delivery network</p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Simple Integration</h3>
              <p className="text-muted-foreground">Easy to integrate with any website or application with just a URL</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Optimize?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start optimizing your images in seconds with our powerful service
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Sign Up Free
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground/20 bg-transparent px-8 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="w-full border-t py-6 md:py-0"> */}
      {/*   <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"> */}
      {/*     <p className="text-center text-sm leading-loose text-muted-foreground md:text-left"> */}
      {/*       © 2025 ImageOptimize. All rights reserved. */}
      {/*     </p> */}
      {/*     <div className="flex items-center gap-4"> */}
      {/*       <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline"> */}
      {/*         Terms */}
      {/*       </Link> */}
      {/*       <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline"> */}
      {/*         Privacy */}
      {/*       </Link> */}
      {/*       <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline"> */}
      {/*         Contact */}
      {/*       </Link> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </footer> */}
      </>
  );
}
