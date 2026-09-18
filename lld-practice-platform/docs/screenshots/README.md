# Screenshot Gallery

Place the supplied UI screenshots in this directory with the exact filenames below. The root README already references them, so GitHub will render the gallery after the files are committed.

| Filename | Screen |
| --- | --- |
| `01-home.png` | Home hero / landing screen |
| `02-problem-library.png` | Problem library with all three cards |
| `03-problem-brief.png` | Parking Lot problem brief |
| `04-elevator-brief.png` | Elevator System problem brief |
| `05-vending-machine-brief.png` | Vending Machine problem brief |
| `06-practice-workspace.png` | Practice page with guided fields |
| `07-submission-form.png` | Lower portion of the submission form |
| `08-attempt-history.png` | Attempt history page |

## Add screenshots from Windows

1. Save each attached screenshot from the chat to your local computer.
2. Rename it to the matching filename above.
3. Copy the files into this directory.
4. From `lld-practice-platform`, run:

```powershell
git add docs/screenshots README.md
git commit -m "Add GitHub README and product screenshots"
git push
```

Do not add screenshots containing API keys, passwords, personal tokens, or private user data.