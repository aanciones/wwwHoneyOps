module ApplicationHelper
  def canonical_url
    request.base_url + request.path
  end

  def honey_icon(name, classes: "h-5 w-5 text-amber-300")
    content_tag(
      :svg,
      honey_icon_paths(name).html_safe,
      class: classes,
      fill: "none",
      stroke: "currentColor",
      stroke_width: "1.5",
      stroke_linecap: "round",
      stroke_linejoin: "round",
      viewBox: "0 0 24 24",
      aria: { hidden: true }
    )
  end

  private

  def honey_icon_paths(name)
    case name.to_sym
    when :shield
      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />'
    when :server
      '<rect x="3" y="4" width="18" height="6" rx="2" ry="2" />\
<rect x="3" y="14" width="18" height="6" rx="2" ry="2" />\
<line x1="7" y1="7" x2="7.01" y2="7" />\
<line x1="7" y1="17" x2="7.01" y2="17" />'
    when :download
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />\
<polyline points="7 10 12 15 17 10" />\
<line x1="12" y1="3" x2="12" y2="15" />'
    when :key
      '<circle cx="8" cy="12" r="4" />\
<path d="M12 12h4l2 2 2-2" />\
<line x1="16" y1="10" x2="16" y2="8" />'
    when :network
      '<circle cx="6" cy="6" r="3" />\
<circle cx="18" cy="8" r="3" />\
<circle cx="12" cy="18" r="3" />\
<path d="M8 8.5 11 14" />\
<path d="M16 9.5 13 14" />\
<path d="M9 6.5 16 8" />'
    when :settings
      '<circle cx="12" cy="12" r="3" />\
<path d="M12 3v2.5" />\
<path d="M12 18.5V21" />\
<path d="m4.94 4.94 1.77 1.77" />\
<path d="m17.29 17.29 1.77 1.77" />\
<path d="M3 12h2.5" />\
<path d="M18.5 12H21" />\
<path d="m4.94 19.06 1.77-1.77" />\
<path d="m17.29 6.71 1.77-1.77" />'
    when :bell
      '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />\
<path d="M13.73 21a2 2 0 0 1-3.46 0" />'
    when :ticket
      '<path d="M3 9a2 2 0 0 1 2-2h3a2 2 0 0 0 2-2V3h4v2a2 2 0 0 0 2 2h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3a2 2 0 0 0-2 2v2h-4v-2a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2Z" />\
<path d="m9 12 2 2 4-4" />'
    when :report
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />\
<polyline points="14 2 14 8 20 8" />\
<path d="M12 12v5l4-2z" />'
    when :users
      '<circle cx="9" cy="9" r="3" />\
<path d="M4 21v-1a5 5 0 0 1 10 0v1" />\
<circle cx="17" cy="13" r="3" />\
<path d="M21 21v-1a4 4 0 0 0-4-4h-1" />'
    when :log_in
      '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />\
<polyline points="10 17 15 12 10 7" />\
<line x1="15" y1="12" x2="3" y2="12" />'
    when :cpu
      '<rect x="6" y="6" width="12" height="12" rx="2" />\
<rect x="10" y="10" width="4" height="4" rx="1" />\
<path d="M10 2v2" />\
<path d="M14 2v2" />\
<path d="M10 20v2" />\
<path d="M14 20v2" />\
<path d="M2 10h2" />\
<path d="M2 14h2" />\
<path d="M20 10h2" />\
<path d="M20 14h2" />'
when :docs
    '<path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />\
<path d="M15 3v4h4" />\
<line x1="9" y1="9" x2="13" y2="9" />\
<line x1="9" y1="13" x2="15" y2="13" />\
<line x1="9" y1="17" x2="13" y2="17" />'
  when :linkedin
    '<rect x="4" y="4" width="16" height="16" rx="2" />\
<path d="M8 11v5" />\
<circle cx="8" cy="8" r="1" />\
<path d="M12 16v-3a2 2 0 0 1 4 0v3" />\
<path d="M12 13h4" />'
when :bar_chart
  '<line x1="3" y1="3" x2="3" y2="21" />\
<line x1="9" y1="9" x2="9" y2="21" />\
<line x1="15" y1="5" x2="15" y2="21" />\
<line x1="21" y1="14" x2="21" y2="21" />'

when :activity
  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />'

when :file_text
  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />\
<polyline points="14 2 14 8 20 8" />\
<line x1="10" y1="12" x2="14" y2="12" />\
<line x1="10" y1="16" x2="18" y2="16" />'
when :mail
  '<rect x="3" y="5" width="18" height="14" rx="2" ry="2" />\
<polyline points="3 7 12 13 21 7" />'
when :user
  '<circle cx="12" cy="8" r="4" />\
<path d="M6 20v-1a6 6 0 0 1 12 0v1" />'
    else
      '<circle cx="12" cy="12" r="10" />'
    end
  end
end
