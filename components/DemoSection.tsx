'use client'
import React, { useState } from 'react';
import {Copy} from 'lucide-react';
import Image from 'next/image';

interface DemoSectionProps {
  
}

const DemoSection: React.FC<DemoSectionProps> = ({  }) => {
  const [height, setHeight] = useState<number>(250)
  const [width, setWidth] = useState<number>(400)
  const [quality, setQuality] = useState<number>(80)

  let  baseUrl = `https://supabase-onfly.vercel.app/img/5f4393f6-91c0-466a-8c86-ba3c5eea387b?h=${height}&w=${width}&q=${quality}` 

  // setting up blurDataURL
  const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  return (
    <div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="flex flex-col space-y-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Base URL</h3>
                <div className="mt-2 flex items-center gap-2 rounded-md bg-muted p-3 font-mono text-sm">
                  <span className="truncate">{baseUrl}</span>
                  <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted-foreground/10">
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="font-bold">Width</h3>
                  <p className="text-sm text-muted-foreground">Resize width to 300px</p>
                  <div className="mt-2 rounded-md bg-muted p-2 font-mono text-xs">
                    <span className="text-primary">?w=300</span>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="font-bold">Height</h3>
                  <p className="text-sm text-muted-foreground">Resize height to 200px</p>
                  <div className="mt-2 rounded-md bg-muted p-2 font-mono text-xs">
                    <span className="text-primary">?h=200</span>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="font-bold">Quality</h3>
                  <p className="text-sm text-muted-foreground">Set quality to 75%</p>
                  <div className="mt-2 rounded-md bg-muted p-2 font-mono text-xs">
                    <span className="text-primary">?q=75</span>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="font-bold">Format</h3>
                  <p className="text-sm text-muted-foreground">Convert to WebP</p>
                  <div className="mt-2 rounded-md bg-muted p-2 font-mono text-xs">
                    <span className="text-primary">?fm=webp</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Combined Parameters</h3>
                <p className="text-sm text-muted-foreground">Resize to 300x200px, 80% quality, WebP format</p>
                <div className="mt-2 flex items-center gap-2 rounded-md bg-muted p-3 font-mono text-sm">
                  <span className="truncate">
                    example.com/img/abcd1234-5678-90ef<span className="text-primary">?w=300&h=200&q=80&fm=webp</span>
                  </span>
                  <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted-foreground/10">
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative w-full max-w-md overflow-hidden rounded-lg border bg-background shadow-xl">
                <div className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Live Demo</h3>
                    <p className="text-sm text-muted-foreground">
                      See how parameters transform your image in real-time
                    </p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="image-url" className="text-sm font-medium">
                        Image URL
                      </label>
                      <div className="flex items-center gap-2 rounded-md border bg-muted p-2 font-mono text-sm">
                        <span className="truncate">{baseUrl}</span>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 ">
                      <div className="grid gap-2">
                        <label htmlFor="width" className="text-sm font-medium">
                          Width (px)
                        </label>
                        <input id="width" type="range" min="50" max="800" value={width} className="w-full" onChange={e => setWidth(Number(e.currentTarget.value))} />
                        <div className="text-right text-sm">{`${width}px`}</div>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="height" className="text-sm font-medium">
                          Height (px)
                        </label>
                        <input id="height" type="range" min="50" max="800" value={height} className="w-full" onChange={e => setHeight(Number(e.currentTarget.value))} />
                        <div className="text-right text-sm">{`${height}px`}</div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="quality" className="text-sm font-medium">
                        Quality (%)
                      </label>
                      <input id="quality" type="range" min="10" max="100" value={quality} className="w-full" onChange={e => setQuality(Number(e.currentTarget.value))} />
                      <div className="text-right text-sm">{quality}</div>
                    </div>
                    <div className="rounded-md border p-1">
                  <Image
                    src={baseUrl}
                    alt="Preview"
                    width={768}
                    height={480}
                    blurDataURL={rgbDataURL(146, 168, 232)}
                    className="h-auto w-full rounded object-cover"
                    placeholder="blur"
                    quality={100}
                      />
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-muted p-2 font-mono text-xs">
                      <span className="truncate">
                    {baseUrl}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default DemoSection;
