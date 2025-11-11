# Comprehensive Grammatical Mistakes Found in the Website

## 🔴 CRITICAL ERRORS (Must Fix)

### 1. BeyondAcademicsAddAchievement.tsx (Line 65)
- **Current**: "Competitions or sub-nationals from across the state"
- **Problem**: "sub-nationals" is not a valid English word
- **Fix Needed**: Replace "sub-nationals" with proper wording

### 2. Login.tsx (Line 20)
- **Current**: "Enter your email below to login to your account"
- **Problem**: "login" should be "log in" (two words when used as a verb)
- **Fix Needed**: Change "login" to "log in"

### 3. EduRevGradeUpgradeForm.tsx (Line 143, 147)
- **Current**: "Grade Upgradation (Core/Non-Core)" and "Submit your achievement for grade upgradation"
- **Problem**: "Upgradation" is not standard English; correct term is "Upgrade" or "Upgrading"
- **Fix Needed**: Replace "Upgradation" with "Upgrade" and "upgradation" with "upgrade"

### 4. EduRev.tsx (Line 43) & EduRevCategoryCourses.tsx (Line 58) & EduRevAddAchievement.tsx (Line 23)
- **Current**: "Grade Upgradation (Core/Non Core)"
- **Problem**: "Upgradation" is not standard English
- **Fix Needed**: Change to "Grade Upgrade (Core/Non Core)"

### 5. EduRevAddAchievement.tsx (Line 192)
- **Current**: "Edu Rev Portal"
- **Problem**: Inconsistent spacing - should match "EduRev" used elsewhere
- **Fix Needed**: Change to "EduRev Portal" for consistency

### 6. Index.tsx (Line 15)
- **Current**: "Edu Rev"
- **Problem**: Inconsistent spacing - should be "EduRev" to match other places
- **Fix Needed**: Change to "EduRev"

### 6b. Header.tsx (Line 13)
- **Current**: "Edu Rev"
- **Problem**: Inconsistent spacing - should be "EduRev" to match other places
- **Fix Needed**: Change to "EduRev"

## 🟡 GRAMMAR ISSUES (Should Fix)

### 7. Index.tsx (Line 142)
- **Current**: "Three specialized pathways designed to capture, verify, and reward your achievements"
- **Problem**: Sentence fragment - missing verb or relative pronoun
- **Fix Needed**: Change to "Three specialized pathways that are designed to capture..."

### 8. Courses.tsx (Line 90)
- **Current**: "Discover available EduRev benefits for each of your courses."
- **Problem**: Missing article "the"
- **Fix Needed**: Change to "Discover the available EduRev benefits..."

### 9. Projects.tsx (Line 123)
- **Current**: "They'll respond to schedule a consultation."
- **Problem**: Ambiguous pronoun "They'll" - unclear reference
- **Fix Needed**: Change to "The mentor will respond to schedule a consultation."

### 10. BeyondAcademics.tsx (Line 165)
- **Current**: `<span className=" ">Excellence</span>`
- **Problem**: Empty className with just a space (formatting issue)
- **Fix Needed**: Remove empty className or add proper styling

### 11. EduRevExtraCreditsForm.tsx (Line 271)
- **Current**: "(Specify the co-curricular/extra curricular/ cultural activities wherein student can participate in order to avail course equivalence)"
- **Problem**: Multiple issues:
  - "wherein" should be "in which" or "where"
  - "student" should be "students" (plural) or "a student"
  - "avail" should be "obtain" or "receive"
  - Missing articles and awkward phrasing
- **Fix Needed**: Rewrite for clarity

### 12. EduRevExtraCreditsForm.tsx (Line 300)
- **Current**: "(Level of co-curricular/extra curricular/ cultural activities)"
- **Problem**: Inconsistent spacing with slashes and awkward phrasing
- **Fix Needed**: Rewrite for clarity: "(Level of co-curricular, extra-curricular, or cultural activities)"

### 13. EduRevExtraCreditsForm.tsx (Line 276)
- **Current**: "Describe the co-curricular/extra curricular/cultural activities..."
- **Problem**: Inconsistent spacing and formatting
- **Fix Needed**: Standardize spacing: "Describe the co-curricular, extra-curricular, or cultural activities..."

## 🟢 STYLE & CLARITY (Consider Fixing)

### 14. EduRev.tsx (Line 99)
- **Current**: "Select the course you want to apply for benefits in."
- **Problem**: Ends with preposition (acceptable but can be improved)
- **Suggestion**: "Select the course for which you want to apply benefits."

### 15. EduRev.tsx (Line 75)
- **Current**: "Internship Beyond the Curriculum"
- **Problem**: Should be plural "Internships" to match other categories
- **Suggestion**: "Internships Beyond the Curriculum"

### 16. EduRev.tsx (Line 157)
- **Current**: "Transform Your Achievements Into Success"
- **Problem**: "Into" should be lowercase in title case (prepositions)
- **Suggestion**: "Transform Your Achievements into Success"

### 17. StudentReferral.tsx (Line 132)
- **Current**: "Know someone with outstanding achievements? Refer them to our platform and earn rewards when they get verified!"
- **Problem**: Missing comma before "and" in compound sentence
- **Suggestion**: Add comma: "Refer them to our platform, and earn rewards..."

### 18. EduRevCategoryCourses.tsx (Line 338)
- **Current**: "Don't see your course?"
- **Problem**: Contraction in heading - could be more formal
- **Suggestion**: "Don't See Your Course?" (capitalize) or "Do Not See Your Course?"

### 19. EduRevMOOCForm.tsx (Line 274)
- **Current**: "Agency & Course Information"
- **Problem**: "Agency" is misleading - should be "Platform" to match the context
- **Suggestion**: "Platform & Course Information"

### 20. EduRevMOOCForm.tsx (Line 278)
- **Current**: "Agency *"
- **Problem**: Should be "Platform" to match the dropdown options (Coursera, edX, etc.)
- **Suggestion**: "Platform *"

### 21. EduRevMOOCForm.tsx (Line 287)
- **Current**: "Select agency"
- **Problem**: Should be "Select platform"
- **Suggestion**: Change to "Select platform"

### 22. EduRevMOOCForm.tsx (Line 300)
- **Current**: "Please specify your agency"
- **Problem**: Should be "Please specify your platform"
- **Suggestion**: Change to "Please specify your platform"

### 23. EduRevMOOCForm.tsx (Line 434)
- **Current**: "Include: Topics covered (equivalent to course), skills & knowledge gained, and any project work or practical components completed..."
- **Problem**: Missing article "the" before "course"
- **Suggestion**: "Include: Topics covered (equivalent to the course), skills and knowledge gained, and any project work or practical components completed..."

### 24. EduRevMOOCForm.tsx (Line 530)
- **Current**: "Bonus marks (2-10 marks) based on certification quality"
- **Problem**: Redundant - "marks" appears twice
- **Suggestion**: "Bonus marks (2-10) based on certification quality" or "2-10 bonus marks based on certification quality"

### 25. EduRevRPLForm.tsx (Line 310)
- **Current**: "List the topics or modules you've covered..."
- **Problem**: "you've" - contraction (acceptable but could be more formal)
- **Suggestion**: "List the topics or modules you have covered..." (optional)

### 26. EduRevAddAchievement.tsx (Line 195)
- **Current**: "Submit your structured achievements tied to academic, research, and career pathways."
- **Problem**: Should be "pathway" (singular) OR clarify if multiple pathways
- **Note**: Actually correct if referring to multiple types of pathways

### 27. Projects.tsx (Line 116)
- **Current**: "Your project application has been sent to the mentor. You'll hear back within 48 hours."
- **Problem**: "You'll" - contraction (acceptable but could be more formal)
- **Suggestion**: "You will hear back within 48 hours." (optional)

### 28. StudentReferral.tsx (Line 293-295)
- **Current**: "We'll contact..." and "You'll be notified..."
- **Problem**: Contractions (acceptable but could be more formal)
- **Suggestion**: "We will contact..." and "You will be notified..." (optional)

### 29. BeyondAcademics.tsx (Line 240)
- **Current**: "Your achievements don't just showcase your talents—they earn you tangible rewards..."
- **Problem**: "don't" - contraction (acceptable in modern English)
- **Note**: This is fine, but could be "do not" for more formal tone

### 30. Dashboard.tsx (Line 214)
- **Current**: "View all the benefits you've unlocked through your achievements"
- **Problem**: "you've" - contraction (acceptable)
- **Note**: This is fine

### 31. Courses.tsx (Line 215)
- **Current**: "Now that you've seen the available benefits..."
- **Problem**: "you've" - contraction (acceptable)
- **Note**: This is fine

### 32. EduRevAddAchievement.tsx (Line 431)
- **Current**: "You'll receive email notifications on status updates"
- **Problem**: "You'll" - contraction (acceptable)
- **Note**: This is fine

---

## Summary

**Total Issues Found: 33**
- **Critical Errors (Must Fix): 7**
- **Grammar Issues (Should Fix): 7**
- **Style/Clarity (Consider Fixing): 19**

### Priority Fixes:
1. "sub-nationals" → proper wording
2. "login" → "log in" (verb)
3. "Upgradation" → "Upgrade" (multiple instances)
4. "Edu Rev" → "EduRev" (consistency)
5. Sentence fragment in Index.tsx
6. Missing article in Courses.tsx
7. Ambiguous pronoun in Projects.tsx
8. Grammatical errors in EduRevExtraCreditsForm.tsx
9. "Agency" → "Platform" in EduRevMOOCForm.tsx

Please provide the correct wording for each item, and I'll apply all the fixes across the codebase.
