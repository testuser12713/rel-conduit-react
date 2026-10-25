# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Editorial-calm Conduit look: warm white surfaces, a single green accent, Literata for headlines and article text, Inter for interface — quiet, reading-first, so the new "min read" value simply sits in the existing meta line.

## Colors

- `--color-bg`: **#FFFFFF**
- `--color-surface`: **#F7F7F7**
- `--color-surface-hover`: **#FAFAFA**
- `--color-fg`: **#2B2B2B**
- `--color-fg-strong`: **#1A1A1A**
- `--color-muted`: **#8C8C8C**
- `--color-border`: **#E5E5E5**
- `--color-accent`: **#5CB85C**
- `--color-accent-hover`: **#449D44**
- `--color-accent-active`: **#3D8B3D**
- `--color-accent-tint`: **#EFF7EF**
- `--color-accent-ring`: **#B8E0B8**
- `--color-danger`: **#C0392B**
- `--color-placeholder-bg`: **#FFF7E6**
- `--color-placeholder-border`: **#E0B252**
- `--color-on-accent`: **#FFFFFF**

## Typography

- `heading_font`: "Literata", Georgia, "Times New Roman", serif
- `font_family`: "Inter", system-ui, "Segoe UI", Roboto, Arial, sans-serif
- `heading_weight`: 700
- `body_weight`: 400
- `size_scale`: 12px meta/label, 14px ui-small, 15px body, 18px article body, 20px card title, 26px page title, 32px article title, 44px hero
- `line_heights`: headings 1.25, ui 1.5, article body 1.7
- Literata files: `design/fonts/literata/` — `font.css` holds its @font-face rules, `OFL.txt` its licence
- Inter files: `design/fonts/inter/` — `font.css` holds its @font-face rules, `OFL.txt` its licence

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button

Inter 500, 14px, padding 12px 20px, min-height 44px (mobile tap target), radius sm=4px, transition 120ms. Primary: bg=accent #5CB85C, fg=#FFFFFF; hover bg=accent-hover #449D44; active bg=accent-active #3D8B3D plus translateY(1px); disabled opacity .55, cursor not-allowed, no hover change; focus-visible 2px outline accent-ring #B8E0B8 with 2px offset. Secondary/outline: transparent bg, 1px border accent, fg=accent, hover bg=accent-tint #EFF7EF. Danger-link (Delete): transparent bg, fg=danger, no border, 44px tap height. Never place two primaries in one region.

### ArticleMeta

One single line (flex row, align center, gap 8px, no wrap except very narrow: then wrap after the author name only). Avatar 32px circle, author name Inter 500 14px in accent, then date Inter 400 13px muted, then a mid-dot separator '·' muted, then reading time Inter 400 13px muted — identical size, weight and colour as the date, no badge, no pill, no icon, no underline, no own line. Date format is always 'MMM DD, YYYY' (e.g. 'Mar 04, 2025'); reading time is always '<n> min read' (e.g. '3 min read', '1 min read' — no plural case, no translation). readingTime is rendered only as a React text node: `Number.isInteger(readingTime) && readingTime >= 1 ? `${readingTime} min read` : null`; never dangerouslySetInnerHTML, never a concatenated HTML string. If readingTime is missing or not an integer, both the text and its preceding separator are omitted, so nothing (especially no 'undefined min read' / 'NaN min read') appears and no dangling dot is left.

### ArticlePreview

List row of an article: padding 20px 0, border-bottom 1px border #E5E5E5, hover bg=surface-hover #FAFAFA, transition 120ms. Top: title Literata 600 20px/1.3 fg-strong, 2 lines max, links to /article/:slug, hover fg=accent. Below: description Inter 400 15px/1.5 muted, clamped to 2 lines. Bottom row: ArticleMeta on the left, favorite button on the right (44px tap height, heart outline muted -> filled accent when favorited, count in Inter 500 12px muted, focus-visible ring). Whole row is not a single <a>: title is the link, favorite is a separate button (no nested interactives).

### NavBar

Height 64px, sticky top, bg=bg #FFFFFF, border-bottom 1px border, horizontal padding 24px, container max-width 1160px centred. Left: brand wordmark 'conduit' in Literata 700 22px accent, links home. Right: links Inter 400 15px muted, hover fg (Home, Sign in / New Post outline button, avatar menu when signed in). Mobile (<640px): 48px height rows, links collapse into a hamburger that opens a full-width panel, brand stays visible.

### Footer

Present on every screen (Home, Tag Feed, Profile, Article Detail, Privacy). bg=surface #F7F7F7, border-top 1px border, padding 24px, inner max-width 1160px, Inter 400 13px muted. Left: 'conduit' wordmark small + one-line attribution link. Right: inline links 'Home', 'Privacy', 'Terms' — the 'Privacy' link points to /privacy and keeps 44px tap height, hover fg, active underline. Never omitted on the Privacy page itself.

### FeedTabs

Full-width strip inside the content column, border-bottom 1px border. Each tab: Inter 500 14px, padding 12px 0 with 16px right margin, min-height 44px, fg=muted; hover fg=fg; active fg=accent with 2px accent underline flush to the border. Order: 'Your Feed', 'Global Feed', and a third tab '#tag' only when a tag filter is active. Empty feed shows a muted inline line instead of an empty strip.

### ArticleList

Vertical stack of ArticlePreview rows separated by 1px border, no outer card, no shadow. Wrapper padding 0 0 24px. Loading: 3 skeleton rows (grey #F0F0F0 bars at title width 60%, excerpt 90%, meta 40%, 150ms pulse) with the list's own dimensions so nothing jumps. Empty: centred Inter 400 15px muted line 'No articles are here... yet.' plus a primary link button. Error: inline ErrorList above the list with a secondary 'Try again' button.

### Pagination

Row of page buttons under the list, gap 4px, each min 44x44px, radius sm, Inter 500 14px; default fg=accent with transparent bg, hover bg=accent-tint; active page bg=accent fg=#FFFFFF. 'Previous'/'Next' as text buttons, disabled at the ends (opacity .55). Wraps to a centred block on mobile.

### TagChip

Pill radius, 1px border border, bg=surface #F7F7F7, fg=muted, Inter 400 12px, padding 4px 10px, min-height 28px (list context) but 44px tap height when used as a link target in the sidebar (padding 8px 12px). Hover when clickable: border accent, fg accent, bg accent-tint. Article page shows an article's tags as non-clickable chips (bg surface, fg muted).

### PopularTags

Sidebar card: heading 'Popular Tags' Literata 600 15px fg-strong, then TagChip items in a flex-wrap row, gap 6px, each 44px tap height, each links to /tag/:tag. Loading: 6 grey placeholder chips. Empty: muted line 'No tags are here... yet.'

### Sidebar

Right rail, width 1/3 of the 1160px container, sticky top 88px, own vertical scroll not needed. Stack of cards, gap 24px: PopularTags card first, optional editorial note card second (bg accent-tint, radius sm, Literata 400 14px/1.6 fg, max 3 lines). Hidden below 1024px, where its content moves under the main column in the same order (tags first).

### HeroBanner

Full-bleed band, bg accent-tint #EFF7EF, padding 48px 24px, centred. Wordmark 'conduit' Literata 700 44px accent and tagline Inter 400 16px muted, max-width 640px. Reads well on the tag variant too, where the wordmark becomes the tag name '#tag' at 36px. Mobile: padding 32px 16px, wordmark 32px.

### ProfileHeader

Centred block, bg=surface #F7F7F7, padding 32px 24px, border-bottom 1px border. Avatar 100px circle, username Literata 600 24px fg-strong, bio Inter 400 15px muted max-width 560px, and for the owner an outline 'Edit Profile Settings' button (44px) — no primary button for visitors.

### ArticleHeader

Full-width band bg=surface #F7F7F7, padding 32px 0, inner narrow column 760px: title Literata 700 32px/1.25 fg-strong (44px/1.2 at >=1024px), then one ArticleMeta line (avatar, author, date, '·', '3 min read'). Owner sees outline 'Edit Article' and danger-link 'Delete Article' right-aligned on the same band, wrapping under the meta on mobile.

### ArticleBody

Markdown output in a 760px column, Inter 400 18px/1.7 fg, paragraphs margin-bottom 16px, h2 Literata 600 24px, blockquote left border 3px accent + italic muted, code JetBrains Mono 14px on surface with radius sm, images max-width 100%. Below the body a TagChip row (non-clickable), then a 1px border divider with 32px margin.

### CommentCard

Card with 1px border, radius sm, padding 16px, margin-bottom 16px. Body Inter 400 15px/1.6 fg (plain text, never dangerouslySetInnerHTML), footer row: author Inter 500 13px accent, date Inter 400 12px muted — same 'MMM DD, YYYY' format, and for the owner a danger-link Delete at 44px tap height. Hover: border accent-ring.

### CommentForm

Card with 1px border, radius sm; Textarea min-height 100px, padding 12px, radius sm, border border; focus border accent + 2px accent-ring. Footer row: Avatar 32px on the left, primary 'Post Comment' button right-aligned, min-height 44px. Disabled while submitting (opacity .55).

### Avatar

Circle, sizes 24px (preview meta) / 32px (article meta, comment) / 100px (profile). Image object-fit cover, 1px border border; fallback: initials Inter 600 on accent-tint with accent text, same circle. Always alt text = author username.

### Input

Height 44px, padding 0 12px, radius sm, border 1px border, bg bg, Inter 400 15px fg, placeholder muted. Focus: border accent, 2px outline accent-ring offset 0. Invalid: border danger plus ErrorList line under the field. Label above in Inter 500 13px fg, 4px gap.

### Textarea

Same tokens as Input, min-height 120px (200px in the editor), padding 12px, Inter 400 15px/1.6, resize vertical. Focus ring identical to Input.

### ErrorList

Unordered list, role=alert, Inter 400 13px danger #C0392B on bg #FDF3F2 with 1px border #F0C8C2, radius sm, padding 8px 12px, margin-bottom 16px. Renders the API's {errors:{field:[...]}} values as text nodes only. Never prints a stacktrace, request body or raw HTML.

### SkeletonBar

Rounded surface block, bg #F0F0F0, radius sm, 150ms opacity pulse (0.6 → 1). Used for article rows, meta lines, tag chips and comment cards; widths 60/90/40% mirror the real content so the layout does not jump.

### PrivacySection

Narrow column 800px. Section heading Literata 600 20px fg-strong, body Inter 400 15px/1.7 fg, paragraphs margin-bottom 12px, lists with 20px padding-left. Every section carries an id so the sticky in-page table of contents can link to it.

### ProcessingTable

Table, width 100%, border-collapse collapse, Inter 400 14px. Header row bg surface, Inter 600 12px uppercase letter-spacing .04em muted, text-align left; cells padding 12px, border-bottom 1px border, zebra bg #FAFAFA. Columns: Processing, Data, Purpose, Legal basis, Retention, Recipients, Third country. Mobile (<640px): table collapses into stacked definition blocks — one block per processing, label Inter 600 12px muted above each value.

### PlaceholderBadge

Inline badge marking data the client still has to supply: text '[To be provided by the client]', Inter 500 12px, fg #8A6A1F on bg #FFF7E6 with 1px dashed border #E0B252, radius sm, padding 2px 8px, never hidden, never styled as a normal value. It appears wherever the spec supplies no responsible party, hosting provider, supervisory authority or concrete retention period.

### TableOfContents

Sticky block at top of the Privacy page (left rail from 1024px, horizontal scroll chip row below that): links to each section, Inter 400 14px muted, hover fg, active fg=accent with 2px accent left border, 44px tap height.

## Layout Principles

- Container max-width 1160px, centred, horizontal padding 24px (16px below 640px). Reading and legal text live in a narrower 760px/800px column inside it.
- Breakpoints: 640px (mobile), 1024px (two-column). Above 1024px: content 2/3 + sidebar 1/3. Below 1024px: single column, sidebar content moves below the list in the same order. Below 640px: navbar collapses, tables stack, all tap targets stay >= 44px.
- Vertical rhythm from the spacing scale only: 16px inside a card, 24px between cards, 32px between sections, 48px for page-level bands. Two font families only (Literata for headings and article text, Inter for interface).
- ONE date format everywhere: 'MMM DD, YYYY' (moment dateFormat, e.g. 'Mar 04, 2025') — never a relative date, never a numeric locale format.
- ONE duration format everywhere: '<n> min read' with an integer n >= 1 (e.g. '3 min read', '1 min read'), no plural case, no translation, no unit abbreviation other than 'min read'. A non-integer or missing value renders as nothing at all.
- The author meta line keeps its existing order — avatar, author, date — and the reading time is appended after a muted '·' as a further muted text element: same line, same size, same colour, never a badge or a chip.
- Counts (favorites, comments, articles) are rendered as plain integers with Inter 500 12px next to their icon; any numeric data (reading time, counts) uses tabular figures.
- Focus is always visible: 2px accent-ring outline with 2px offset on every interactive element; hover/active shifts come from the accent ramp only, never from a second hue.
- UI language is English throughout (labels, meta text, empty and error states, the legal page). No new colour hue, no gradients, no shadows beyond an optional 0 1px 2px rgba(0,0,0,.04) on sticky elements.
- Global shell on every route: NavBar on top, Footer with the 'Privacy' link at the bottom — including the Privacy page itself.

## Screens

### Home (/)

Layout: Hero band full width; below it a 2-column grid (content 8/12 + sidebar 4/12) from 1024px, single column below with the popular tags moved under the pagination.

- NavBar: brand 'conduit', Home link, and Sign in + 'New Post' (outline button) for visitors or the avatar menu for signed-in users.
- HeroBanner: accent-tint band with the wordmark and the tagline 'A place to share your knowledge.'
- FeedTabs: 'Your Feed' (only when signed in) and 'Global Feed'; selecting one loads its ArticleList. Primary action is opening an article.
- ArticleList: ArticlePreview rows — title, 2-line excerpt, and the meta row with avatar, author, date, '·' and '3 min read' on the left, favorite button with count on the right.
- Pagination: page buttons plus Previous/Next under the list.
- Sidebar: PopularTags card (chips linking to /tag/:tag) and an editorial note card.
- Footer: wordmark, attribution and the 'Privacy' link.

States: Loading: 3 SkeletonBar article rows plus 6 placeholder tag chips. Empty: muted 'No articles are here... yet.' with a primary link to start writing. Error: ErrorList with the API's {errors} text and a 'Try again' button, list area keeps its height.

### TagFeed (/tag/:tag)

Layout: Identical grid to Home (content 8/12 + sidebar 4/12 from 1024px, single column below).

- NavBar: same global shell, 'Global Feed' tab stays the visually adjacent entry point.
- HeroBanner (tag variant): the tag name rendered as '#tag' in Literata at 36px, tagline line stating that these are articles about the tag.
- FeedTabs: 'Global Feed' tab plus an active '#tag' tab carrying the 2px accent underline.
- ArticleList: ArticlePreview rows of the filtered result, each with the meta row avatar, author, date, '·', '4 min read'.
- Pagination: page buttons for the filtered result.
- Sidebar: PopularTags card so the user can pivot to another tag.
- Footer: global footer with 'Privacy'.

States: Loading: skeleton rows. Empty: 'No articles are here... yet.' plus a secondary 'Remove filter' link back to '/'. Error: ErrorList plus retry; the active tag tab stays visible so context is never lost.

### Profile (/profile/:username)

Layout: ProfileHeader band full width; below it the same 2-column grid as Home (content 8/12 + sidebar 4/12 from 1024px, single column below).

- NavBar: global shell with the avatar menu for signed-in users.
- ProfileHeader: 100px Avatar, username, bio, and for the owner the outline 'Edit Profile Settings' button (no primary for visitors).
- FeedTabs: 'My Articles' and 'Favorited Articles', active tab with accent underline; both lists show the same ArticlePreview composition including '2 min read'.
- ArticleList: the selected tab's articles with title, excerpt, meta row (avatar, author, date, '·', reading time) and favorite count.
- Pagination: page buttons for the selected tab.
- Sidebar: PopularTags card.
- Footer: global footer, 'Privacy' link included.

States: Loading: profile header skeleton (circle + 2 bars) over 3 article skeletons. Empty (tab-specific): 'No articles are here... yet.' for My Articles, 'No favorited articles... yet.' for Favorited Articles, each with an inline link back to the global feed. Error: ErrorList with retry; the profile header keeps the already-known username and bio visible.

### ArticleDetail (/article/:slug)

Layout: ArticleHeader band full width with a 760px inner column; body below in the same 760px column placed at 2/3 of the container with the sidebar in 1/3 from 1024px, everything stacked single-column below.

- NavBar: global shell; 'New Post' or avatar menu as usual.
- ArticleHeader: Literata 32-44px title, then the single ArticleMeta line — avatar, author, date, '·', '3 min read' — directly beside the date; for the owner an outline 'Edit Article' and a danger-link 'Delete Article' on the same band.
- ArticleBody: sanitised markdown of the article in the reading column, followed by the TagChip row (non-clickable).
- Comments: heading with the comment count, CommentCard list (author, date, body, owner-only delete) and below it the CommentForm with the primary 'Post Comment' button.
- Sidebar: PopularTags card and the author card linking to /profile/:username.
- Footer: global footer with the 'Privacy' link.

States: Loading: header title and meta skeleton bars plus body skeleton lines. Empty comments: muted 'No comments yet. Be the first to comment.' above the form, form stays usable. Error: Article not found or load failure renders an ErrorList with a link back to the global feed; comment errors appear inside the CommentForm and never wipe the typed text.

### PrivacyPolicy (/privacy)

Layout: Narrow 800px document column centred, with a sticky TableOfContents rail on the left from 1024px; below that the contents become a horizontally scrollable chip row above the text.

- NavBar: global shell, so every other page stays reachable.
- PageIntro: Literata 26px heading 'Privacy Policy', a one-line lead and the visible label 'Last updated: <date>' in the 'MMM DD, YYYY' format.
- TableOfContents: links to every section below.
- ControllerSection: the responsible party with contact details — where the spec supplies none, the value is a PlaceholderBadge '[To be provided by the client]' instead of invented data.
- ProcessingTable: one row per real processing operation — registration and login (email, hashed password), profile data, articles/comments/favorites, hosting including server logs with IP address — each with data, purpose, legal basis, retention, recipients and third-country transfer; unknown cells carry the placeholder badge.
- RightsSection: list of data-subject rights (access, rectification, erasure, restriction, portability, objection) and the complaint right against the supervisory authority, whose name and address are a placeholder badge.
- Footer: global footer with 'Privacy' kept.

States: Static content, no loading spinner. If a future data source fails, the sections stay readable and the failure appears as an ErrorList at the top. Every gap in the spec's information is shown as a visible placeholder badge, never silently omitted and never filled with invented values.
