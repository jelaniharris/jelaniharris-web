---
title: Fixing the error 0xe800400c or (-48) when syncing to Itunes
date: "2011-08-21T22:12:03.284Z"
tags: ["troubleshooting", "itunes"]
---

Imagine how disappointed I was when I had plugged in my brand new iPad 2 and only to realize that it simply cannot sync with my iTunes.

If you’re getting an error messages or weird stuff like:

*   Device Timed Out error message
*   Internal device error
*   An unknown error has occurred 0xe800400c or -48
*   Failing on particularly the song synchronization part – and claims that the songs cannot be found.
*   An unusual long time to sync  – compared to other apple products – and then just to fail right at the end.
*   Occasionally after an error message, my 16GB iPad would show that it was only 4GB large. If you reconnect it, it goes back to normal.

I might have figured out how to fix this problem – at least for me. Your solution may be different of course. Here’s what I did on my Windows PC.

1.  Install/upgrade iTunes to the latest version
2.  Restore factory settings on the iPad
3.  Disable firewall (so iTunes can talk to apple) and also disable your anti-virus software. Yes, Microsoft Security Essentials counts. You want to disable anything that can get between iTunes and the iPad.
4.  Check to make sure that your BIOS is updated. My gigabyte P55 board was 7 versions out of date. This is at your own risk of course.
5.  Reconnected the iPad to a different USB spot that **is not** the front ports, or a USB hub, or USB on a monitor. Use the back ones – the ones directly attached to the motherboard.

My guess  is that the USB isn’t providing enough power to charge  or perform syncs with the iPad. My motherboard had a bios update that actually resolves the underpowered USB issue. After praying for a successful patch and a reboot later my ipad was finally syncing.

I really, really hopes this helps and saves some people some time out there.