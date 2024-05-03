class_name EmText
extends EmNode

@onready var rich_text_label: RichTextLabel = $RichTextLabel

func get_inspector_fields() -> Dictionary:
	return {
		"text": {
			"display_name": "Text",
			"type": "multiline_text",
		}
	}

func on_inspector_field_changed(field: String, value: Variant) -> void:
	if field == "text":
		rich_text_label.text = value
		pass
