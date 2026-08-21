import os

def create_resume_pdf(output_path):
    # Pure Python PDF 1.4 Generator
    content = []
    
    # PDF Stream Builder
    stream_lines = []
    
    # Helper to add text
    # Page dimensions: 595.28 x 841.89 pt (A4)
    # Origin (0,0) is bottom left
    
    # Background Canvas: Subtle Cream / White
    stream_lines.append("q")
    stream_lines.append("0.97 0.97 0.96 rg") # #f8f8f5
    stream_lines.append("0 0 595.28 841.89 re f")
    
    # Header Background Accent Card
    stream_lines.append("1.0 1.0 1.0 rg") # Pure white card
    stream_lines.append("30 710 535.28 100 re f")
    stream_lines.append("0.85 0.87 0.82 RG 1 w")
    stream_lines.append("30 710 535.28 100 re S")
    
    # Header Texts
    stream_lines.append("0.07 0.08 0.06 rg") # Dark ink
    stream_lines.append("BT /F2 22 Tf 50 770 Td (ELLYZ GOMEZ) Tj ET")
    
    stream_lines.append("0.37 0.44 0.31 rg") # Sage Green #5e6f4f
    stream_lines.append("BT /F2 11 Tf 50 750 Td (PROJECT MANAGER  |  UI/UX) Tj ET")
    
    # Contact Info (Right Aligned Header)
    stream_lines.append("0.4 0.42 0.38 rg") # Muted ink
    stream_lines.append("BT /F1 9 Tf 360 775 Td (Location: Quezon City, Philippines) Tj ET")
    stream_lines.append("BT /F1 9 Tf 360 760 Td (Email: ellyz.gomez@example.com) Tj ET")
    stream_lines.append("BT /F1 9 Tf 360 745 Td (Portfolio: https://ellyzgomez.dev) Tj ET")
    
    # Function for Section Header
    def draw_section_header(title, y):
        lines = []
        lines.append("0.07 0.08 0.06 rg")
        lines.append(f"BT /F2 11 Tf 30 {y} Td ({title}) Tj ET")
        lines.append("0.07 0.08 0.06 RG 1.5 w")
        lines.append(f"30 {y-4} m 565.28 {y-4} l S")
        return lines

    # 1. Professional Summary
    stream_lines.extend(draw_section_header("PROFESSIONAL SUMMARY", 680))
    stream_lines.append("0.15 0.17 0.14 rg")
    stream_lines.append("BT /F1 10 Tf 30 655 Td (I am a 4th-year IT student at Quezon City University with a strong interest in web development) Tj ET")
    stream_lines.append("BT /F1 10 Tf 30 640 Td (and UI/UX design. I focus on creating user-centered and functional designs while continuously) Tj ET")
    stream_lines.append("BT /F1 10 Tf 30 625 Td (improving my technical knowledge. My goal is to develop into a skilled professional who can contribute) Tj ET")
    stream_lines.append("BT /F1 10 Tf 30 610 Td (to innovative and impactful projects.) Tj ET")

    # 2. Core Competencies & Skills
    stream_lines.extend(draw_section_header("CORE COMPETENCIES & TECHNICAL SKILLS", 575))
    
    # 3 Boxes for skills
    # Box 1: Development
    stream_lines.append("1.0 1.0 1.0 rg 30 465 170 90 re f")
    stream_lines.append("0.85 0.87 0.82 RG 1 w 30 465 170 90 re S")
    stream_lines.append("0.37 0.44 0.31 rg BT /F2 9.5 Tf 40 535 Td (DEVELOPMENT) Tj ET")
    stream_lines.append("0.2 0.22 0.18 rg")
    stream_lines.append("BT /F1 8.5 Tf 40 515 Td (- HTML5, CSS3, JavaScript) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 40 500 Td (- React, Node.js, PHP) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 40 485 Td (- Java, SQL, XAMPP) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 40 472 Td (- Responsive Web Dev) Tj ET")

    # Box 2: Design & Tools
    stream_lines.append("1.0 1.0 1.0 rg 212 465 170 90 re f")
    stream_lines.append("0.85 0.87 0.82 RG 1 w 212 465 170 90 re S")
    stream_lines.append("0.37 0.44 0.31 rg BT /F2 9.5 Tf 222 535 Td (DESIGN & TOOLS) Tj ET")
    stream_lines.append("0.2 0.22 0.18 rg")
    stream_lines.append("BT /F1 8.5 Tf 222 515 Td (- UI/UX Design & Prototyping) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 222 500 Td (- Figma, Photoshop, Canva) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 222 485 Td (- Google & Microsoft Suite) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 222 472 Td (- Basic Troubleshooting) Tj ET")

    # Box 3: Core Competencies
    stream_lines.append("1.0 1.0 1.0 rg 395 465 170 90 re f")
    stream_lines.append("0.85 0.87 0.82 RG 1 w 395 465 170 90 re S")
    stream_lines.append("0.37 0.44 0.31 rg BT /F2 9.5 Tf 405 535 Td (CORE COMPETENCIES) Tj ET")
    stream_lines.append("0.2 0.22 0.18 rg")
    stream_lines.append("BT /F1 8.5 Tf 405 515 Td (- Problem-Solving & Logic) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 405 500 Td (- Adaptability & Creativity) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 405 485 Td (- Attention to Detail) Tj ET")
    stream_lines.append("BT /F1 8.5 Tf 405 472 Td (- Teamwork & Fast Learner) Tj ET")

    # 3. Education
    stream_lines.extend(draw_section_header("EDUCATION", 435))
    stream_lines.append("1.0 1.0 1.0 rg 30 365 535.28 50 re f")
    stream_lines.append("0.85 0.87 0.82 RG 1 w 30 365 535.28 50 re S")
    stream_lines.append("0.07 0.08 0.06 rg BT /F2 10.5 Tf 45 398 Td (Bachelor of Science in Information Technology) Tj ET")
    stream_lines.append("0.37 0.44 0.31 rg BT /F2 9.5 Tf 430 398 Td (4th Year  |  2023 - Present) Tj ET")
    stream_lines.append("0.35 0.38 0.33 rg BT /F1 9.5 Tf 45 380 Td (Quezon City University - Quezon City, Philippines) Tj ET")

    # 4. Projects & Leadership
    stream_lines.extend(draw_section_header("PROJECT HIGHLIGHTS & LEADERSHIP", 335))
    
    # Project 1
    stream_lines.append("1.0 1.0 1.0 rg 30 250 535.28 65 re f")
    stream_lines.append("0.85 0.87 0.82 RG 1 w 30 250 535.28 65 re S")
    stream_lines.append("0.07 0.08 0.06 rg BT /F2 10 Tf 45 295 Td (User-Centered Web & UI Systems Architecture) Tj ET")
    stream_lines.append("0.37 0.44 0.31 rg BT /F2 9 Tf 460 295 Td (2025 - Present) Tj ET")
    stream_lines.append("0.25 0.28 0.23 rg BT /F1 9 Tf 45 278 Td (- Spearheaded intuitive interface designs and interaction prototypes with clean accessibility standards.) Tj ET")
    stream_lines.append("0.25 0.28 0.23 rg BT /F1 9 Tf 45 264 Td (- Implemented responsive UI components ensuring optimal user experience across multiple devices.) Tj ET")

    # Project 2
    stream_lines.append("1.0 1.0 1.0 rg 30 165 535.28 65 re f")
    stream_lines.append("0.85 0.87 0.82 RG 1 w 30 165 535.28 65 re S")
    stream_lines.append("0.07 0.08 0.06 rg BT /F2 10 Tf 45 210 Td (IT Student Project & Organization Leadership) Tj ET")
    stream_lines.append("0.37 0.44 0.31 rg BT /F2 9 Tf 460 210 Td (2024 - Present) Tj ET")
    stream_lines.append("0.25 0.28 0.23 rg BT /F1 9 Tf 45 193 Td (- Managed project roadmaps, coordinated cross-functional sprints, and facilitated milestone reviews.) Tj ET")
    stream_lines.append("0.25 0.28 0.23 rg BT /F1 9 Tf 45 179 Td (- Delivered client-focused digital solution strategies bridging software logic with user-centered design.) Tj ET")

    # Footer Strip
    stream_lines.append("0.55 0.58 0.53 rg")
    stream_lines.append("BT /F1 8 Tf 30 40 Td (Official Resume of Ellyz Gomez - Verified Document - Generated 2025) Tj ET")
    stream_lines.append("BT /F1 8 Tf 480 40 Td (Page 1 of 1) Tj ET")
    stream_lines.append("Q")

    stream_data = "\n".join(stream_lines).encode("latin1")
    stream_len = len(stream_data)

    objects = []
    
    # Obj 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    
    # Obj 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    
    # Obj 3: Page
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>")
    
    # Obj 4: Contents Stream
    objects.append(f"<< /Length {stream_len} >>\nstream\n".encode("latin1") + stream_data + b"\nendstream")
    
    # Obj 5: Font F1 (Helvetica)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    
    # Obj 6: Font F2 (Helvetica-Bold)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

    # Construct final PDF
    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    
    offsets = []
    for i, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{i} 0 obj\n".encode("latin1"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")
        
    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode("latin1"))
    for off in offsets:
        pdf.extend(f"{off:010d} 00000 n \n".encode("latin1"))
        
    pdf.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode("latin1"))
    
    with open(output_path, "wb") as f:
        f.write(pdf)
    print(f"Successfully generated {output_path} ({len(pdf)} bytes)")

if __name__ == "__main__":
    out_dir = r"c:\Users\campo\Desktop\My Portfolio\assets"
    os.makedirs(out_dir, exist_ok=True)
    create_resume_pdf(os.path.join(out_dir, "Ellyz_Gomez_Resume.pdf"))
