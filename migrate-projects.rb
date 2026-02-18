#!/usr/bin/env ruby
# Migration script to convert YAML projects to markdown collection files
# Usage: ruby migrate-projects.rb

require 'yaml'
require 'fileutils'
require 'date'

# Configuration
PROJECTS_YML = '_data/projects.yml'
UNIVERSITY_YML = '_data/university-projects.yml'
OUTPUT_DIR = '_projects'

# Create output directory if it doesn't exist
FileUtils.mkdir_p(OUTPUT_DIR)

# Helper to slugify project names
def slugify(text)
  text.downcase
      .gsub(/[^\w\s-]/, '')
      .gsub(/[\s_]+/, '-')
      .gsub(/^-+|-+$/, '')
end

# Helper to generate markdown file
def create_project_file(project, category, index)
  title = project['name']
  slug = slugify(title)

  # Check if project with this slug already exists
  filename = "#{OUTPUT_DIR}/#{slug}.md"
  if File.exist?(filename)
    puts "  ⚠️  Skipping #{title} - file already exists"
    return
  end

  # Determine a reasonable date (use current year minus index for ordering)
  date = Date.new(2024, 12, 1) - (index * 7) # One week apart

  # Try to infer category from project name/description
  inferred_category = case category
                      when 'university'
                        'university'
                      else
                        if title.downcase.include?('autopi') || title.downcase.include?('automation')
                          'automation'
                        elsif title.downcase.include?('security') || title.downcase.include?('scan')
                          'security'
                        elsif title.downcase.include?('k8s') || title.downcase.include?('kubernetes') || title.downcase.include?('kafka')
                          'infrastructure'
                        elsif title.downcase.include?('design') || title.downcase.include?('ux')
                          'design'
                        else
                          'automation'
                        end
                      end

  # Create front matter
  front_matter = {
    'title' => title,
    'slug' => slug,
    'excerpt' => project['description'],
    'category' => inferred_category,
    'tags' => [],
    'tech_stack' => [],
    'date' => date.to_s,
    'featured' => false,
    'project_url' => project['link'] || '',
    'github_url' => '',
    'demo_url' => '',
    'image' => "/i533837/my-portfolio/#{project['image']}",
    'company' => category == 'university' ? 'University' : 'SAP'
  }

  # Create markdown content
  content = <<~MARKDOWN
    ---
    #{front_matter.to_yaml.lines[1..-1].join}
    ---

    ## Overview

    #{project['description']}

    ## Problem Statement

    [Describe the problem or challenge this project addressed]

    ## Solution

    [Describe your approach and implementation]

    ### Key Features
    - [Feature 1]
    - [Feature 2]
    - [Feature 3]

    ## Technical Stack

    - **[Technology Area]**: [Technologies used]
    - **[Technology Area]**: [Technologies used]

    ## Results & Impact

    [Describe the outcomes and impact of this project]

    ## Challenges Overcome

    1. **[Challenge 1]**: [How you overcame it]
    2. **[Challenge 2]**: [How you overcame it]

    ## Learnings

    [Key takeaways and lessons learned from this project]
  MARKDOWN

  # Write file
  File.write(filename, content)
  puts "  ✅ Created #{slug}.md"
end

# Main migration logic
puts "🚀 Starting project migration..."
puts

# Migrate professional projects
if File.exist?(PROJECTS_YML)
  puts "📦 Migrating professional projects from #{PROJECTS_YML}"
  projects = YAML.load_file(PROJECTS_YML)
  projects.each_with_index do |project, index|
    create_project_file(project, 'professional', index)
  end
  puts "  Done! Migrated #{projects.length} professional projects"
  puts
end

# Migrate university projects
if File.exist?(UNIVERSITY_YML)
  puts "🎓 Migrating university projects from #{UNIVERSITY_YML}"
  projects = YAML.load_file(UNIVERSITY_YML)
  projects.each_with_index do |project, index|
    create_project_file(project, 'university', index)
  end
  puts "  Done! Migrated #{projects.length} university projects"
  puts
end

puts "✨ Migration complete!"
puts
puts "Next steps:"
puts "1. Review the generated files in #{OUTPUT_DIR}/"
puts "2. Fill in the [placeholder] sections with actual content"
puts "3. Mark 3-5 projects as 'featured: true' to show in homepage carousel"
puts "4. Add appropriate tags and tech_stack arrays"
puts "5. Test with: bundle exec jekyll serve"
puts "6. Once satisfied, you can remove or archive _data/projects.yml files"
