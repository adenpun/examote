class_name EmNode
extends Node

enum NODE_TYPES {
  TEXT
}

static func new_node(type: NODE_TYPES) -> Node:
  match type:
    NODE_TYPES.TEXT:
      return EmText.new()
    _:
      return null

func get_inspector_fields() -> Dictionary:
  return {}

func add_child_em_node(_node: EmNode) -> bool:
  return false
