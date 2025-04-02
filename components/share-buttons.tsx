"use client"

import { motion } from "framer-motion"
import { Twitter, Facebook, Linkedin, Link } from "lucide-react"
import { useState } from "react"

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url,
    )}&title=${encodeURIComponent(title)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-semibold">Share this article</h3>
      <div className="flex gap-2">
        {[
          { icon: Twitter, href: shareData.twitter, label: "Twitter" },
          { icon: Facebook, href: shareData.facebook, label: "Facebook" },
          { icon: Linkedin, href: shareData.linkedin, label: "LinkedIn" },
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="w-5 h-5" />
            <span className="sr-only">Share on {label}</span>
          </motion.a>
        ))}
        <motion.button
          onClick={copyToClipboard}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link className="w-5 h-5" />
          <span className="sr-only">Copy link</span>
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs py-1 px-2 rounded">
              Copied!
            </span>
          )}
        </motion.button>
      </div>
    </div>
  )
}

