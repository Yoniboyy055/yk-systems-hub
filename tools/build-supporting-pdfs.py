#!/usr/bin/env python3
"""Build branded customer-facing PDFs from the Hub's Markdown source files."""

from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"

DEEP = colors.HexColor("#003D37")
TEAL = colors.HexColor("#008B81")
TEAL_BRIGHT = colors.HexColor("#12C5B4")
SIGNAL = colors.HexColor("#DF3C1F")
INK = colors.HexColor("#050807")
MUTED = colors.HexColor("#52605C")
LINE = colors.HexColor("#D8E3DF")
WASH = colors.HexColor("#F3FAF7")
PAPER = colors.white

FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
pdfmetrics.registerFont(TTFont("YKBody", str(FONT_DIR / "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("YKBody-Bold", str(FONT_DIR / "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("YKMono", str(FONT_DIR / "DejaVuSansMono.ttf")))


DOCUMENTS = [
    {
        "source": "automation-starter-vault.md",
        "output": "automation-starter-vault.pdf",
        "title": "The Automation Starter Vault",
        "subtitle": "25 practical AI prompts, 10 workflow blueprints, and a clear first step for business automation.",
        "edition": "FREE PACKAGE 001 | 2026 EDITION",
    },
    {
        "source": "small-business-automation-checklist.md",
        "output": "small-business-automation-checklist.pdf",
        "title": "Small Business Automation Checklist",
        "subtitle": "Find one repeated task worth improving before you choose tools or build a complex system.",
        "edition": "YK SYSTEMS | PRACTICAL WORKSHEET",
    },
    {
        "source": "workflow-audit-worksheet.md",
        "output": "workflow-audit-worksheet.pdf",
        "title": "Workflow Audit Worksheet",
        "subtitle": "Map the current process, locate the friction, and define the simplest useful improvement.",
        "edition": "YK SYSTEMS | PRACTICAL WORKSHEET",
    },
]


def make_styles():
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="YKBody",
            fontSize=9.3,
            leading=14,
            textColor=INK,
            spaceAfter=7,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName="YKBody",
            fontSize=9.1,
            leading=13.2,
            textColor=INK,
            spaceAfter=5,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="YKBody-Bold",
            fontSize=22,
            leading=26,
            textColor=DEEP,
            spaceBefore=16,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="YKBody-Bold",
            fontSize=15,
            leading=19,
            textColor=DEEP,
            spaceBefore=14,
            spaceAfter=7,
            keepWithNext=True,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName="YKBody-Bold",
            fontSize=11.2,
            leading=15,
            textColor=TEAL,
            spaceBefore=10,
            spaceAfter=5,
            keepWithNext=True,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName="YKBody",
            fontSize=9.1,
            leading=13.4,
            textColor=INK,
            leftIndent=15,
            firstLineIndent=-10,
            bulletIndent=2,
            spaceAfter=4,
        ),
        "code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="YKMono",
            fontSize=7.6,
            leading=11.2,
            textColor=DEEP,
            spaceAfter=0,
        ),
        "cover_kicker": ParagraphStyle(
            "CoverKicker",
            fontName="YKBody-Bold",
            fontSize=8.5,
            leading=11,
            textColor=TEAL_BRIGHT,
            alignment=TA_CENTER,
            spaceAfter=18,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            fontName="YKBody-Bold",
            fontSize=30,
            leading=35,
            textColor=PAPER,
            alignment=TA_CENTER,
            spaceAfter=17,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            fontName="YKBody",
            fontSize=12,
            leading=18,
            textColor=colors.HexColor("#D9F7F3"),
            alignment=TA_CENTER,
            spaceAfter=18,
        ),
        "cover_brand": ParagraphStyle(
            "CoverBrand",
            fontName="YKBody-Bold",
            fontSize=12,
            leading=15,
            textColor=PAPER,
            alignment=TA_CENTER,
        ),
    }


def rich_text(value: str) -> str:
    escaped = html.escape(value.strip())
    escaped = re.sub(r"`([^`]+)`", r"<font name='YKMono'>\1</font>", escaped)
    labels = (
        "Who it is for",
        "Problem it solves",
        "Tools needed",
        "How to use it",
        "How to sell/build it as a service",
        "How to sell it as a service",
        "Upgrade path",
        "Business problem",
        "Step-by-step setup",
        "AI prompt",
        "Process name",
        "Business goal",
        "Trigger",
        "Information collected",
        "Action taken",
        "Human review",
        "System of record",
    )
    for label in labels:
        prefix = html.escape(label) + ":"
        if escaped.startswith(prefix):
            escaped = f"<b>{prefix}</b>{escaped[len(prefix):]}"
            break
    return escaped


def footer(canvas, doc):
    canvas.saveState()
    width, _ = LETTER
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, 0.53 * inch, width - doc.rightMargin, 0.53 * inch)
    canvas.setFont("YKBody", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.33 * inch, "YK SYSTEMS | Automation, agents, governance, and business operations")
    canvas.drawRightString(width - doc.rightMargin, 0.33 * inch, str(doc.page))
    canvas.restoreState()


def cover_page(canvas, doc):
    canvas.saveState()
    width, height = LETTER
    canvas.setFillColor(DEEP)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(colors.HexColor("#005A52"))
    canvas.rect(0, 0, width, 0.26 * inch, stroke=0, fill=1)
    canvas.restoreState()


def cover(story, meta, styles):
    panel = Table(
        [[
            Paragraph(
                f"<font color='#12C5B4'>YK</font> SYSTEMS",
                styles["cover_brand"],
            )
        ]],
        colWidths=[6.7 * inch],
        rowHeights=[0.55 * inch],
    )
    panel.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#101817")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOX", (0, 0), (-1, -1), 0, colors.HexColor("#101817")),
    ]))
    story.extend([
        panel,
        Spacer(1, 1.15 * inch),
        Paragraph(meta["edition"], styles["cover_kicker"]),
        Paragraph(meta["title"], styles["cover_title"]),
        Paragraph(meta["subtitle"], styles["cover_subtitle"]),
        Spacer(1, 0.32 * inch),
        Table(
            [[Paragraph("START SMALL. BUILD WHAT MATTERS. KEEP HUMAN CONTROL.", styles["cover_kicker"])]],
            colWidths=[5.4 * inch],
            style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#005A52")),
                ("BOX", (0, 0), (-1, -1), 1, TEAL_BRIGHT),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]),
        ),
        Spacer(1, 1.25 * inch),
        Paragraph("Free practical resource | hub.yksystems.ca", styles["cover_subtitle"]),
        PageBreak(),
    ])


def parse_markdown(source: Path, styles, form_mode: bool = False):
    lines = source.read_text(encoding="utf-8").splitlines()
    story = []
    code_lines: list[str] = []
    in_code = False
    first_h1_skipped = False

    def flush_code():
        nonlocal code_lines
        if not code_lines:
            return
        code = "<br/>".join(html.escape(line) if line else "&#160;" for line in code_lines)
        table = Table([[Paragraph(code, styles["code"]) ]], colWidths=[6.18 * inch])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), WASH),
            ("BOX", (0, 0), (-1, -1), 0.6, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 9),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ]))
        story.extend([table, Spacer(1, 7)])
        code_lines = []

    def response_line(height=0.28 * inch):
        field = Table([[""]], colWidths=[6.05 * inch], rowHeights=[height])
        field.setStyle(TableStyle([
            ("LINEBELOW", (0, 0), (-1, -1), 0.7, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        story.append(field)

    for raw in lines:
        line = raw.rstrip()
        if line.startswith("```"):
            if in_code:
                flush_code()
            in_code = not in_code
            continue
        if in_code:
            code_lines.append(line)
            continue
        if not line.strip():
            story.append(Spacer(1, 3))
            continue
        if line.startswith("# "):
            if not first_h1_skipped:
                first_h1_skipped = True
                continue
            story.append(Paragraph(rich_text(line[2:]), styles["h1"]))
            continue
        if line.startswith("## "):
            story.append(Paragraph(rich_text(line[3:]), styles["h2"]))
            continue
        if line.startswith("### "):
            story.append(Paragraph(rich_text(line[4:]), styles["h3"]))
            continue
        bullet = re.match(r"^- \[ \] (.+)$", line)
        if bullet:
            story.append(Paragraph(f"&#9744; {rich_text(bullet.group(1))}", styles["bullet"]))
            continue
        bullet = re.match(r"^- (.+)$", line)
        if bullet:
            story.append(Paragraph(rich_text(bullet.group(1)), styles["bullet"], bulletText="•"))
            continue
        numbered = re.match(r"^(\d+)\.\s+(.+)$", line)
        if numbered:
            story.append(Paragraph(f"<b>{numbered.group(1)}.</b> {rich_text(numbered.group(2))}", styles["bullet"]))
            continue
        if form_mode and re.match(r"^\d+\.$", line):
            story.append(Paragraph(f"<b>{rich_text(line)}</b>", styles["bullet"]))
            response_line(0.22 * inch)
            continue
        if line.endswith(":") and len(line) < 70:
            story.append(Paragraph(f"<b>{rich_text(line)}</b>", styles["label"]))
            if form_mode and line not in {"Examples:", "List each step in order:", "Start with one reliable workflow:"}:
                response_line()
            continue
        story.append(Paragraph(rich_text(line), styles["body"]))
        if form_mode and line.endswith("?"):
            response_line()
    flush_code()
    return story


def build(meta):
    styles = make_styles()
    if meta["source"] == "small-business-automation-checklist.md":
        styles["body"].fontSize = 8.5
        styles["body"].leading = 11.2
        styles["body"].spaceAfter = 4
        styles["bullet"].fontSize = 8.3
        styles["bullet"].leading = 10.8
        styles["bullet"].spaceAfter = 1.8
        styles["h2"].fontSize = 13.2
        styles["h2"].leading = 16
        styles["h2"].spaceBefore = 9
        styles["h2"].spaceAfter = 4
    output = ASSETS / meta["output"]
    doc = SimpleDocTemplate(
        str(output),
        pagesize=LETTER,
        rightMargin=0.65 * inch,
        leftMargin=0.65 * inch,
        topMargin=0.68 * inch,
        bottomMargin=0.72 * inch,
        title=meta["title"],
        author="YK SYSTEMS",
        subject=meta["subtitle"],
    )
    story = []
    cover(story, meta, styles)
    story.extend(parse_markdown(
        ASSETS / meta["source"],
        styles,
        form_mode=meta["source"] == "workflow-audit-worksheet.md",
    ))
    doc.build(story, onFirstPage=cover_page, onLaterPages=footer)
    return output


if __name__ == "__main__":
    for document in DOCUMENTS:
        path = build(document)
        print(path.relative_to(ROOT))
