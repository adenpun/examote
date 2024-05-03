class_name EmContainer
extends EmNode

@onready var container: VBoxContainer = $VBoxContainer

func add_child_em_node(node: EmNode) -> bool:
  container.add_child(node)
  return true
