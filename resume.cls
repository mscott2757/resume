\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}

\LoadClass{article}
\RequirePackage{titlesec}
\RequirePackage{enumitem}
\RequirePackage{array}

\titleformat{\section}
  {\Large\scshape\raggedright}
  {}{0em}
  {}
  [\titlerule]

\titleformat{\subsection}
  {\large\scshape\raggedright}
  {}{0em}
  {}

\titlespacing*{\section}{0em}{0.8em}{0.8em}

\newcommand{\datedsection}[2]{%
  \subsection[#1]{#1 \hfill #2}%
}

\newcommand{\datedsubsection}[2]{%
  \subsection[#1]{#1 \hfill #2}%
}

\newcommand{\experiencetitle}[4]{
  \begin{tabular*}{\textwidth}{l @{\extracolsep{\fill}} r}
    \textbf{#3} & #2\\
    \\[-1em]
    #1 -- #4
  \end{tabular*}
}

\newcommand{\name}[1]{
  \centerline{\Huge{#1}}
}

\newcommand{\contact}[2]{
  #1 {\large\textperiodcentered} #2
}

\RequirePackage{hyperref}
\urlstyle{same}

\RequirePackage[margin=0.5in]{geometry}

\newcommand{\links}[4]{
  \href{#1}{#2} {\large\textperiodcentered} \href{#3}{#4}
}
